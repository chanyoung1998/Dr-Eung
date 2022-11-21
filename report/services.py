# -*- coding: utf-8 -*-

import os
import torch
import numpy as np
import math
import random
# from kobert.utils import get_tokenizer
from gluonnlp.data import SentencepieceTokenizer

# tensorflow
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from transformers import AutoTokenizer, AutoModel

from kss import split_sentences
from .pyhanspellmaster.hanspell import spell_checker

ROOT_DIR = os.getcwd()

# 피드백 모델
class Feedback():
    def __init__(self):
        self.MAXLEN = 100
        self.device = 'cpu' if torch.cuda.is_available() else 'cpu'
        self.embeding_model = AutoModel.from_pretrained('monologg/kobert').to(self.device)
        self.tokenizer = AutoTokenizer.from_pretrained('monologg/kobert')
        self.sp = SentencepieceTokenizer(ROOT_DIR + '/model/kobert_news_wiki_ko_cased-1087f8699e.spiece', num_best=2)
        self.model = tf.keras.models.load_model(ROOT_DIR + '/model/kobert_model2.h5')
        print("feedback model created")
        self.feedback_list = {
            0: {3: '글을 문법에 따라 참 잘 작성했어요. ', 2: '글을 문법에 따라 잘 작성했어요. 그렇지만 틀린 부분을 확인하고 더 정확하게 작성할 수 있도록 노력해보세요.',
                1: '글에 문법적 오류가 조금 많아요. 엉박사님의 맞춤법 교정을 참고해 보세요.',
                0: '글에 문법적 오류가 많아요. 엉박사님의 맞춤법 교정을 참고하여 문법에 따라 글을 다시 한번 작성해 보세요.'},
            1: {3: '어휘력이 정말 뛰어나요!', 2: '어휘력이 좋아요!', 1: '단어의 사용이 적절하지 않은 부분이 있어요.',
                0: '단어의 사용이 적절하지 않은 부분이 많아요. 단어를 다양하게 사용해 보고 글을 다시 작성해 보세요.'},
            2: {3: '', 2: '', 1: '', 0: ''},
            3: {3: '글을 짜임새 있게 잘 작성했어요!', 2: '글을 짜임새 있게 작성했어요.', 1: '작성한 글을 다시 읽어보고 어색한 부분이 없는지 확인해 보세요.',
                0: '글의 짜임새가 부족한 것 같아요. 작성한 글을 다시 한번 읽어 보고 어색한 부분을 찾아보세요.'},
            4: {3: '형식에 따라 글을 잘 작성했어요!', 2: '형식에 따라 글을 잘 작성했어요! ', 1: '형식에 따라 글을 재구성해보세요.',
                0: '글을 작성하기 전 어떤 형식으로 작성할지 생각하고 글을 작성하는 연습을 해보세요.'},
            5: {3: '글의 흐름이 매우 자연스럽네요!', 2: '글의 흐름이 자연스러워요!', 1: '글의 연결이 부자연스러워요. 글의 연결이 어색한 부분을 찾아보세요.',
                0: '글의 연결이 부자연스러워요. 글의 연결이 어색한 부분을 찾아보세요.'},
            6: {3: '적절한 분량의 글을 잘 작성했어요!', 2: '적절한 분량의 글을 잘 작성했어요!', 1: '분량에 알맞게 글을 작성해보세요.', 0: '분량에 알맞게 글을 작성해보세요.'},
            7: {3: '주제가 명료하고 글 전체가 하나의 주제를 잘 뒷받침 하고 있어요.', 2: '주제가 명료하게 드러나 있지만 관련 없는 문장이 존재하는 것 같아요.',
                1: '주제가 명료하지 않고 주제와 관련되지 않은 문장이 많아요. 글의 주제를 정하고 다시 한번 글을 작성해보세요.',
                0: '주제가 명료하지 않고 주제와 관련되지 않은 문장이 많아요. 글의 주제를 정하고 다시 한번 글을 작성해보세요.'},
            8: {3: '모든 설명이 구체적이고 상세하게 잘 작성 했어요.', 2: '모든 설명이 구체적이고 상세하게 작성 했어요.', 1: '몇몇 문장이 구체적이지 않아요.',
                0: '주제에 대한 설명이 부족해요. '},
            9: {3: '', 2: '', 1: '', 0: ''},
            10: {3: '글을 서술함에 있어 특이하며 매우 논리적이에요. 새로운 발상이나 관점 전환을 시도했으며 내용이 매우 적절해요.',
                 2: '글을 서술함에 있어 특이하지만, 논리력이 약간 부족한 부분이 있어요. 새로운 발상이나 관점 전환을 시도했지만, 내용이 약간 빈약해요. ',
                 1: '글을 서술함에 있어 논리력이 부족해요. 새로운 발상이나 관점 전환을 시도했지만, 글과 알맞지 않은 것 같아요.',
                 0: '글을 서술할 때 특이한 통찰이 보이지 않고 새로운 발상이나 관점 전환을 시도하지 않은 것 같아요. 한번 나만의 이야기를 적어보세요.'},
        }
        self.weight_list = {
            11: [4, 3, 0, 0, 5, 0, 1, 4, 2, 0, 4],
            12: [4, 3, 0, 0, 5, 0, 1, 4, 2, 0, 4],
            13: [3, 3, 0, 1, 5, 1, 1, 4, 2, 0, 4],
        }

    def essay_to_wordlist(self, essay_v):
        """Remove the tagged labels and word tokenize the sentence."""
        token = self.sp(essay_v)
        return token

    def essay_to_sentences(self, essay_v):
        """Sentence tokenize the essay and call essay_to_wordlist() for word tokenization."""
        # raw_sentences = essay_v.split('#@문장구분#')
        raw_sentences = split_sentences(essay_v)
        sentences = []
        for raw_sentence in raw_sentences:
            if len(raw_sentence) > 0:
                tokenized_sentences = self.essay_to_wordlist(raw_sentence)
                if tokenized_sentences != []:
                    sentences.append(tokenized_sentences)
        return sentences

    def preprocessing(self, text):
        return self.essay_to_sentences(text)

    def getScore(self, text):
        essays = self.preprocessing(text)
        inputs = self.tokenizer.batch_encode_plus(essays, is_split_into_words=True)
        ids_new = pad_sequences(inputs['input_ids'],
                                maxlen=self.MAXLEN, padding='post')
        mask_new = pad_sequences(
            inputs['attention_mask'], maxlen=self.MAXLEN, padding='post')
        out = self.embeding_model(input_ids=torch.tensor(ids_new).to(self.device),
                                  attention_mask=torch.tensor(mask_new).to(self.device))

        embedded_features = out[0].detach().cpu()[:, 0, :].numpy()
        model_inputs = pad_sequences([embedded_features], maxlen=128, padding='pre', dtype='float')
        model_outputs = self.model.predict(model_inputs)

        return model_outputs.tolist()[0]

    def getFeedBack(self, text, age=11):
        result = {"feedback": "", "score": []}
        result["score"] = self.getScore(text)
        scores = list(map(lambda x: math.floor(3 * x), result["score"]))

        feedback_dict = {0: 0, 1: 0, 2: 0, 3: 1, 4: 1, 5: 1, 6: 1, 7: 2, 8: 2, 9: 2, 10: 2}
        feedback_element = [False, False, False]  # 표현 영역, 구성 영역, 내용 영역 각 1개의 피드백만 포함하도록.

        feedback_good = []
        feedback_bad = []

        feedback_order = [(i, weight, score) for i, (weight, score) in enumerate(zip(self.weight_list[age], scores))]
        random.shuffle(feedback_order)

        for i, weight, score in feedback_order:
            if weight == 0:
                continue

            if score >= 2 and not feedback_element[feedback_dict[i]]:
                feedback_good.append(self.feedback_list[i][score])
                feedback_element[feedback_dict[i]] = True

            elif score < 2 and not feedback_element[feedback_dict[i]]:
                feedback_bad.append((self.feedback_list[i][score]))
                feedback_element[feedback_dict[i]] = True

        if not feedback_bad:
            result["feedback"] = ' 또한 '.join(feedback_good[:2])
        elif not feedback_good:
            result["feedback"] = ' 그리고 '.join(feedback_bad[:2])
        else:
            result["feedback"] = feedback_good[0] + ' 하지만 ' + feedback_bad[0]

        return result

    def spellCheck(self, txt):
        checked = spell_checker.check(txt).as_dict()
        return {
            "correct": ''.join(checked["checked"]),
            "score": int((1 - checked["errors"] / len(checked["words"])) * 100)
        }



# class Feedback:
#     def __init__(self):
#         print("feedback model created")

#     def getFeedBack(self, txt):
#         feedback = {
#             "feedback": "feedback returned",
#             "score": [3,3,3,3,3,3,3,3,3,3,3]
#         }

#         return feedback

#     def spellCheck(self, txt):
#         checked = spell_checker.check(txt).as_dict()
#         return {
#             "correct": ''.join(checked["checked"]),
#             "score": int((1 - checked["errors"]/len(checked["words"])) * 100)
#         }
