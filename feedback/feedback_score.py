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


txt = '''
"익숙함에 속아 소중함을 잊지 말자" 모든 사람들이 아는 말이다.<span>#@문장구분#</span> 그만큼 모두가 그렇게 생각한다는 것이다.<span>#@문장구분#</span> 사람들은 자기가 누리고 있고 자신이 가지고 있는 것을 당연하게 생각한다.<span>#@문장구분#</span> 항상  내 옆에 있을 거라고 믿고 있고 그렇길 바라서이다.<span>#@문장구분#</span>다른 사람들과 마찬가지로 나도 익숙함에 속아 소중함을 잊을 때가 있었다.<span>#@문장구분#</span> 
소중함이 꼭 거창한 것이 아니어도 나에게 행복을 주던 사소한 소중함도 잊어지기도 한다고 느꼈다.<span>#@문장구분#</span> 나에게 맨날 전화가 오던 친구가 있었는데 그 친구는 나에게 전화를 걸고 시시콜콜한 얘기를 했다.<span>#@문장구분#</span> 나도 얘기를 하는 게 좋았는데 매일 오는 전화에 나는 좀 바쁘다고 전화를 자주 못 할때가 있었는데 그러다보니 친구도 나한테 전화를 많이 걸지 않았다.<span>#@문장구분#</span> 매일매일 걸어줄 땐 오는 전화가 당연해서 그렇게 소중한 지 몰랐는데 전화가 안 오니까 심심했고 내가 전화를 기다리게 되었었다.<span>#@문장구분#</span> 그래서 내가 그 친구한테 먼저 전화를 걸기 시작했다.<span>#@문장구분#</span> 내가 먼저 그 친구가 했던 것처럼 전화를 계속 먼저 걸었고 그렇게 하다보니 친구가 다시 원래처럼 나한테 전화를 해서 이야기를 했다.<span>#@문장구분#</span>
나도 전화를 하면서 얘기를 하는 걸 엄청 좋아했고 계속 좋아하지만 매일 올 때는 익숙해져서 그런지 나에게 먼저 찾아오는 친구를 당연하다고 생각했다.<span>#@문장구분#</span> 그런데 전화가 잘 오지 않았을 때 얼마나 소중했는지 알게 되었고 내가 노력해서 다시 소중함을 잊지 않고 생각해서 다행이라고 생각했다.<span>#@문장구분#</span>
이제는 익숙함에 속아 소중함을 잊지 말자를 느껴 봤으니까 소중함을 잊지 않기 위해 내가 더 노력해야겠다고 느꼈고 소중함을 계속 생각하지 않으면 자신에게 소중한 게 없어질 수도 있으니 그전에 잊지 말자는 걸 까먹으면 안 된다고 생각했다.<span>#@문장구분#</span> 
소중함에 익숙함을 잊지 말자!!<span>#@문장구분#</span>
'''

txt= '''
우주에 도착해서 여러 가지 행성을 구경하면서 우주 상식을 키우는 과학책인 줄 알았다. 하지만 행성이 나오지는 않는다. 지수, 할머니, 삼촌 등 가족 이야기만 많이 나온다. 그래서 실망스러웠다. 그래도 끝까지 읽어 나가니 사람은 누구나 각자의 우주를 가지고 산다는 생각을 하게 되었다. 지수의 우주엔 부모님이 살고, 나의 우주는 어마어마하게 넓어서 길을 잃을 만큼 혼란스럽고, 내 친구 민규의 우주는 끝없이 영원한 거다. 그리고 우리 엄마의 우주는 지수처럼 가족이다.

삼촌은 과학책만 보는 지수가 또래와 달라서 걱정한다. 나도 또래와 다르다고 우리 엄마가 말씀하신다. 엄마가 다른 친구들이 공부하는 이야기를 해 주시면 내가 또래와 얼마나 다른지 느낀다. 엄마가 나는 공부 못하는데 내 친구 유경수는 수학 5학년 2학기 진도 다 나갔다고 말씀하실 때, 또 내가 ‘허팝 유튜브’를 보고 있으면 엄마가 공부 안 한다고, 다른 애들은 다 공부하고 있는데 나만 논다고 말씀하실 때 정말 내가 또래와 다르다고 느낀다. 이럴 때는 화가 난다.

할아버지가 비상등을 통해 우주에서 왔다고 해서 지수는 호감을 느낀다.
지수는 가족이 없다. 내가 지수라면 자기처럼 부모가 없는 아이들을 돕는 봉사를 하면서 상처를 치유하고 싶다. 나중에 지수가 커서 봉사하는 직업을 가지면 좋겠다. 자기처럼 어릴 때 부모님을 잃은 아이들에게 자신의 경험을 이야기해 주고, 상처를 치유해 주고, 두렵고, 무서운 세상을 극복하기 위해 각자 어두운 마음의 상처에서 나올 수 있도록 희망을 주는 일을 하면 지수도 언젠가는 자신을 사랑하는 가족을 만날 수 있다.
'''

txt = '정말 안중근 선생님이 자랑스럽다.'
class Feedback():
    def __init__(self):
        self.MAXLEN = 50
        self.device = 'cpu' if torch.cuda.is_available() else 'cpu'
        self.embeding_model = AutoModel.from_pretrained('monologg/kobert').to(self.device)
        self.tokenizer = AutoTokenizer.from_pretrained('monologg/kobert')
        self.sp = SentencepieceTokenizer('./model/kobert_news_wiki_ko_cased-1087f8699e.spiece',num_best=2)
        self.model = tf.keras.models.load_model('./model/kobert_model2.h5')

        self.feedback_list = {
            0:{3:'글을 문법에 따라 참 잘 작성했어요. ', 2:'글을 문법에 따라 잘 작성했어요. 그렇지만 틀린 부분을 확인하고 더 정확하게 작성할 수 있도록 노력해보세요.',1:'글에 문법적 오류가 조금 많아요. 엉박사님의 맞춤법 교정을 참고해 보세요.', 0:'글에 문법적 오류가 많아요. 엉박사님의 맞춤법 교정을 참고하여 문법에 따라 글을 다시 한번 작성해 보세요.'},
            1:{3:'어휘력이 정말 뛰어나요!',2:'어휘력이 좋아요!',1:'단어의 사용이 적절하지 않은 부분이 있어요.',0:'단어의 사용이 적절하지 않은 부분이 많아요. 단어를 다양하게 사용해 보고 글을 다시 작성해 보세요.'},
            2:{3:'',2:'',1:'',0:''},
            3:{3:'글을 짜임새 있게 잘 작성했어요!',2:'글을 짜임새 있게 작성했어요.',1:'작성한 글을 다시 읽어보고 어색한 부분이 없는지 확인해 보세요.',0:'글의 짜임새가 부족한 것 같아요. 작성한 글을 다시 한번 읽어 보고 어색한 부분을 찾아보세요.'},
            4:{3:'형식에 따라 글을 잘 작성했어요!',2:'형식에 따라 글을 잘 작성했어요! ',1:'형식에 따라 글을 재구성해보세요.',0:'글을 작성하기 전 어떤 형식으로 작성할지 생각하고 글을 작성하는 연습을 해보세요.'},
            5:{3:'글의 흐름이 매우 자연스럽네요!',2:'글의 흐름이 자연스러워요!',1:'글의 연결이 부자연스러워요. 글의 연결이 어색한 부분을 찾아보세요.',0:'글의 연결이 부자연스러워요. 글의 연결이 어색한 부분을 찾아보세요.'},
            6:{3:'적절한 분량의 글을 잘 작성했어요!',2:'적절한 분량의 글을 잘 작성했어요!',1:'분량에 알맞게 글을 작성해보세요.',0:'분량에 알맞게 글을 작성해보세요.'},
            7:{3:'주제가 명료하고 글 전체가 하나의 주제를 잘 뒷받침 하고 있어요.',2:'주제가 명료하게 드러나 있지만 관련 없는 문장이 존재하는 것 같아요.',1:'주제가 명료하지 않고 주제와 관련되지 않은 문장이 많아요. 글의 주제를 정하고 다시 한번 글을 작성해보세요.',0:'주제가 명료하지 않고 주제와 관련되지 않은 문장이 많아요. 글의 주제를 정하고 다시 한번 글을 작성해보세요.'},
            8:{3:'모든 설명이 구체적이고 상세하게 잘 작성 했어요.',2:'모든 설명이 구체적이고 상세하게 작성 했어요.',1:'몇몇 문장이 구체적이지 않아요.',0:'주제에 대한 설명이 부족해요. '},
            9:{3:'글을 서술함에 있어 특이하며 매우 논리적이에요. 새로운 발상이나 관점 전환을 시도했으며 내용이 매우 적절해요.',2:'글을 서술함에 있어 특이하지만, 논리력이 약간 부족한 부분이 있어요. 새로운 발상이나 관점 전환을 시도했지만, 내용이 약간 빈약해요. ',1:'글을 서술함에 있어 논리력이 부족해요. 새로운 발상이나 관점 전환을 시도했지만, 글과 알맞지 않은 것 같아요.',0:'글을 서술할 때 특이한 통찰이 보이지 않고 새로운 발상이나 관점 전환을 시도하지 않은 것 같아요. 한번 나만의 이야기를 적어보세요.'},
            10:{3:'',2:'',1:'',0:''}                
        }
        self.weight_list = {
            11:[4,3,0,0,5,0,1,4,2,0,4],
            12:[4,3,0,0,5,0,1,4,2,0,4],
            13:[3,3,0,1,5,1,1,4,2,0,4],
        }


    def essay_to_wordlist(self,essay_v):
        """Remove the tagged labels and word tokenize the sentence."""
        token = self.sp(essay_v)
        return token

    def essay_to_sentences(self,essay_v):
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

    def preprocessing(self,text):
        return self.essay_to_sentences(txt.replace('<span>', '').replace('</span>', '').replace('\n', '').replace('\t', ''))


    def getScore(self,text):

        essays = self.preprocessing(text)
        inputs = self.tokenizer.batch_encode_plus(essays,is_split_into_words=True)
        ids_new = pad_sequences(inputs['input_ids'],
                                maxlen=self.MAXLEN, padding='post')
        mask_new = pad_sequences(
            inputs['attention_mask'], maxlen=self.MAXLEN, padding='post')
        out = self.embeding_model(input_ids=torch.tensor(ids_new).to(self.device),
                    attention_mask=torch.tensor(mask_new).to(self.device))

        embedded_features = out[0].detach().cpu()[:, 0, :].numpy()
        model_inputs =pad_sequences([embedded_features], maxlen=128, padding='pre', dtype='float')
        model_outputs = self.model.predict(model_inputs)

        return model_outputs.tolist()[0]

    def getFeedBack(self,text,age=11):
        scores = list(map(lambda x: math.floor(3*x),self.getScore(text)))
        
        feedback_dict = {0:0,1:0,2:0,3:1,4:1,5:1,6:1,7:2,8:2,9:2,10:2}
        feedback_element = [False,False,False] #표현 영역, 구성 영역, 내용 영역 각 1개의 피드백만 포함하도록.
        
        feedback_good = []
        feedback_bad = []
        
        feedback_order = [(i,weight,score) for i,(weight,score) in enumerate(zip(self.weight_list[age],scores))]
        random.shuffle(feedback_order)

        for i,weight,score in feedback_order:
            if weight == 0:
                continue
            if score >= 2 and not feedback_element[feedback_dict[i]]:
                feedback_good.append(self.feedback_list[i][score])
                feedback_element[feedback_dict[i]] = True

            elif score < 2 and not feedback_element[feedback_dict[i]]:
                feedback_bad.append((self.feedback_list[i][score]))
                feedback_element[feedback_dict[i]] = True
            
        if not feedback_bad:
            return ' 또한 '.join(feedback_good[:2])
        elif not feedback_good:
            return ' 그리고 '.join(feedback_bad[:2])
        else:
            return feedback_good[0] + ' 하지만 ' +  feedback_bad[0]



fb = Feedback()
while True:
    txt = input()
    if txt == 'a':
        break      
    print(fb.getFeedBack(txt))

# 표현: 문법, 어휘력, 표현의 적절성
# 구성: 문단 내 구조의 적절성, 문단 간 구조의 적절성, 구조의 일관성,분량의 적절성
# 내용: 주제의 명료성,설명의 구체성,프롬프트 독해력,사고의 창의성  


