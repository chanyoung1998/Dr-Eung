# -*- coding: utf-8 -*-

from sentence_transformers import SentenceTransformer, util
import re
import networkx as nx
import numpy as np
import json
import os
import itertools

class ExtractiveSummarizaion():
    def __init__(self):
        self.model =  SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS') 

    def text_cleaning(self,text):
        text = re.compile('[가-힣0-9a-zA-Z, ]+[.?!]').findall(text)
        text = list(map(lambda x: x.strip(),text))
        return text
        
    def calculate_score(self,sim_matrix):
        nx_graph = nx.from_numpy_array(sim_matrix)
        scores = nx.pagerank(nx_graph)
        return scores

    def ranked_sentences(self,sentences, scores, n):
        top_scores = sorted(((scores[index],index,sentence) for index,sentence in enumerate(sentences)), reverse=True)
        top_n_sentences = sorted((index,sentence) for score,index,sentence in top_scores[:n])
        extractive_n_sentences_in_order = [sentence for index,sentence in top_n_sentences] 
        return extractive_n_sentences_in_order

        # return " ".join(extractive_n_sentences_in_order)

    def extractive_summarization(self,text,top_n=5):
        model = self.model
        doc_vectors = model.encode(text)
        # sentences = self.text_cleaning(text)
        sentences = text.split('.')
        vectors = model.encode(sentences) # encode sentences into vectors


        # similarities = util.cos_sim(vectors, vectors) # compute similarity between sentence vectors
        # score = self.calculate_score(np.array(similarities)) # compute score based page rank algorithm

        return ' '.join(self.max_sum_sim(doc_vectors,vectors,sentences,top_n,20)[::-1])
        # return ' '.join(self.ranked_sentences(sentences,score,top_n)) # get summarization result

    def max_sum_sim(self,doc_embedding, candidate_embeddings,candidates, top_n, nr_candidates):


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
        print(candidate)
        return [words_vals[idx] for idx in candidate]

if __name__ == '__main__':

    exsum = ExtractiveSummarizaion()
    summ = dict()


    chapter = sorted(os.listdir('../example/book/sherlockholmes')[:-4],key=lambda x: int(re.compile('[0-9]+').findall(x)[0]))
    
    for i in chapter:


        with open(f'../example/book/sherlockholmes/{i}','r',encoding='UTF8') as f:

            txt  = list(map(lambda x:x.strip(), f.read().split('\n')))
            text = ' '.join(txt)
            summ[i] = exsum.extractive_summarization(text,10)


    with open('../example/book/sherlockholmes/summarization_max_sum.json','w',encoding='UTF8') as f:
        json.dump(summ, f, ensure_ascii=False, indent=4)



