# -*- coding: utf-8 -*-

from sentence_transformers import SentenceTransformer, util
import re
import networkx as nx
import numpy as np



def text_cleaning(text):
    text = re.compile('[가-힣0-9a-zA-Z, "]+[.?!]').findall(text)
    text = list(map(lambda x: x.strip(),text))
    return text
    
def calculate_score(sim_matrix):
    nx_graph = nx.from_numpy_array(sim_matrix)
    scores = nx.pagerank(nx_graph)
    return scores

def ranked_sentences(sentences, scores, n):
    top_scores = sorted(((scores[index],index,sentence) for index,sentence in enumerate(sentences)), reverse=True)
    top_n_sentences = sorted((index,sentence) for score,index,sentence in top_scores[:n])
    extractive_n_sentences_in_order = [sentence for index,sentence in top_n_sentences] 
    return extractive_n_sentences_in_order

    # return " ".join(extractive_n_sentences_in_order)

def extractive_summarization(text,top_n=5):
    model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS') 
    sentences = text_cleaning(text)
    vectors = model.encode(sentences) # encode sentences into vectors
    similarities = util.cos_sim(vectors, vectors) # compute similarity between sentence vectors
    score = calculate_score(np.array(similarities)) # compute score based page rank algorithm
    return ' '.join(ranked_sentences(sentences,score,top_n)) # get summarization result


if __name__ == '__main__':
    with open('../example/book/book2.txt','r',encoding='UTF8') as f:
        
        txt  = list(map(lambda x:x.strip(), f.read().split('\n')))
        text = ' '.join(txt)
    
    # print(text_cleaning(text))
    print(extractive_summarization(text,8))