# -*- coding: utf-8 -*-

from eunjeon import Mecab
from sentence_transformers import SentenceTransformer, util
from sklearn.feature_extraction.text import CountVectorizer
import networkx as nx
import re
import numpy as np
import itertools

DICTIONARY_DIR = "/usr/local/lib/mecab/dic/mecab-ko-dic"

# 요약 모델
class ExtractiveSummarizaion():
    def __init__(self):
        self.model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')
        print("summary model created")

    def text_cleaning(self, text):
        text = re.compile('[가-힣0-9a-zA-Z, ]+[.?!]').findall(text)
        text = list(map(lambda x: x.strip(), text))
        return text

    def calculate_score(self, sim_matrix):
        nx_graph = nx.from_numpy_array(sim_matrix)
        scores = nx.pagerank(nx_graph)
        return scores

    def ranked_sentences(self, sentences, scores, n):
        top_scores = sorted(((scores[index], index, sentence) for index, sentence in enumerate(sentences)),
                            reverse=True)

        top_n_sentences = sorted(index for score, index, sentence in top_scores[:n])
        # extractive_n_sentences_in_order = [sentence for index, sentence in top_n_sentences]
        return top_n_sentences
        # return extractive_n_sentences_in_order

        # return " ".join(extractive_n_sentences_in_order)

    def extractive_summarization(self, sentences, top_n=5):
        model = self.model
        # doc_vectors = model.encode(' '.join(sentences)) ---- 1
        # sentences = self.text_cleaning(text)
        # sentences = text.split('.')
        # sentences = split_sentences(text)

        vectors = model.encode(sentences)  # encode sentences into vectors

        similarities = util.cos_sim(vectors, vectors)  # compute similarity between sentence vectors
        score = self.calculate_score(np.array(similarities))  # compute score based page rank algorithm
        return self.ranked_sentences(sentences, score, top_n)
        # return ' '.join(self.ranked_sentences(sentences, score, top_n))  # get summarization result

        # return ' '.join(self.max_sum_sim(doc_vectors, vectors, sentences, top_n, 20)[::-1]) --- 1

    def max_sum_sim(self, doc_embedding, candidate_embeddings, candidates, top_n, nr_candidates):

        # 문서와 각 키워드들 간의 유사도
        distances = util.cos_sim(doc_embedding, candidate_embeddings)

        # 각 키워드들 간의 유사도
        distances_candidates = util.cos_sim(candidate_embeddings,
                                            candidate_embeddings)

        # 코사인 유사도에 기반하여 키워드들 중 상위 top_n개의 단어를 pick.
        words_idx = sorted(list(distances.argsort()[0][-nr_candidates:]))
        # print(distances)
        # print(words_idx)
        words_vals = [candidates[index] for index in words_idx]
        distances_candidates = distances_candidates[np.ix_(words_idx, words_idx)]

        # 각 키워드들 중에서 가장 덜 유사한 키워드들간의 조합을 계산
        min_sim = np.inf
        candidate = None
        for combination in itertools.combinations(range(len(words_idx)), top_n):
            sim = sum([distances_candidates[i][j] for i in combination for j in combination if i != j])
            if sim < min_sim:
                candidate = combination
                min_sim = sim
        if candidate == None:
            candidate = tuple(range(len(words_idx)))
        # print(candidate)
        return [words_vals[idx] for idx in candidate]


# 키워드 추출
class KeywordExtractor():

    def __init__(self):
        # self.model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')
        self.model = SentenceTransformer('jhgan/ko-sbert-multitask')
        self.mecab = Mecab(DICTIONARY_DIR)
        print("keyword model created")
        self.stopwords = {'저것', '이것', '이', '있', '하', '것', '들', '그', '되', '수', '이', '보', '않', '없', '나', '사람', '주', '아니',
                          '등', '같', '우리', '때', '년', '가', '한', '지', '대하', '오', '말', '일', '그렇', '위하', '때문', '그것', '두',
                          '말하', '알', '그러나', '받', '못하', '일', '그런', '또', '문제', '더', '사회', '많', '그리고', '좋', '크', '따르', '중',
                          '나오', '가지', '씨', '시키', '만들', '지금', '생각하', '그러', '속', '하나', '집', '살', '모르', '적', '월', '데',
                          '자신', '안', '어떤', '내', '경우', '명', '생각', '시간', '그녀', '다시', '이런', '앞', '보이', '번', '나', '다른',
                          '어떻', '여자', '개', '들', '사실', '이렇', '점', '싶', '말', '정도', '좀', '원', '잘', '통하', '소리', '놓'}


    def max_sum_sim(self, doc_embedding, candidate_embeddings, candidates, top_n, nr_candidates):
        # 문서와 각 키워드들 간의 유사도
        distances = util.cos_sim(doc_embedding, candidate_embeddings)

        # 각 키워드들 간의 유사도
        distances_candidates = util.cos_sim(candidate_embeddings,
                                            candidate_embeddings)

        # 코사인 유사도에 기반하여 키워드들 중 상위 top_n개의 단어를 pick.
        words_idx = list(distances.argsort()[0][-nr_candidates:])
        words_vals = [candidates[index] for index in words_idx]
        distances_candidates = distances_candidates[np.ix_(words_idx, words_idx)]
        # 각 키워드들 중에서 가장 덜 유사한 키워드들간의 조합을 계산
        min_sim = np.inf
        candidate = None
        for combination in itertools.combinations(range(len(words_idx)), top_n):
            sim = sum([distances_candidates[i][j] for i in combination for j in combination if i != j])
            if sim < min_sim:
                candidate = combination
                min_sim = sim

        return [words_vals[idx] for idx in candidate]

    def extract_keyword(self, text, top_n=3):
        model = self.model
        mecab = self.mecab
        nouns = list(set([word for word, tag in mecab.pos(text) if
                          tag in set(['NNG', 'NNP']) and tag not in self.stopwords]))  # get meaningful Nouns from text

        doc_embedding = model.encode([text])  # encode text into vector
        nouns_embedding = model.encode(nouns)  # encode each nouns into vector
        distances = util.cos_sim(doc_embedding, nouns_embedding)  # compute distances between text and each nouns

        #keywords = [nouns[index] for index in distances.argsort()[0][:]]  # extract top_n keywords
        keywords_max_sum = self.max_sum_sim(doc_embedding,nouns_embedding,nouns,top_n,10)

        #return keywords[-top_n:]
        return keywords_max_sum

    def extract_keyword_ngram(self, text, top_n=3, ngram_range=(1, 2)):
        model = self.model
        mecab = self.mecab
        nouns = ' '.join(mecab.nouns(text))  # get Nouns-String
        cv = CountVectorizer(ngram_range=ngram_range).fit([nouns])  # compute ngram range nouns using CountVectorizer
        candidates = cv.get_feature_names_out()
        doc_embedding = model.encode([text])  # encode text into vector
        candidates_embedding = model.encode(candidates)  # encode each candidates into vector
        distances = util.cos_sim(doc_embedding, candidates_embedding)  # compute distances between text and each nouns
        keywords = [candidates[index] for index in distances.argsort()[0][-top_n:]]  # extract top_n keywords

        return keywords

# class KeywordExtractor():
#
#     def __init__(self):
#         print("keyword model created")
#
#     def extract_keyword(self, text, top_n=3):
#         keyword = ['keyword1','keyword2','keyword3']
#         return keyword
#
# class ExtractiveSummarizaion():
#     def extractive_summarization(self, sentences, top_n=5):
#         return [1,2,3]

