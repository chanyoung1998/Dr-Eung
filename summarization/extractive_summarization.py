# -*- coding: utf-8 -*-

from sentence_transformers import SentenceTransformer, util
import re
import networkx as nx
import numpy as np



def text_cleaning(text):
    text = re.compile('[가-힣 "]+[.?!]').findall(text)
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
    text = '''
    「새로 전학온 한병태다. 앞으로 잘 지내도록.」
    담임 선생은 그 한 마디로 소래를 끝낸 뒤 나를 뒤쪽 빈 자리에 앉게 하고 바로 수업에 들어갔다. 새로 전학온 아이에 대해 호들갑스럽게 느껴질 정도로 자랑 섞인 소개를 늘어놓던 서울 선생님들의 자상함을 상기하자 나는 야속한 느낌을 억누를 길이 없었다. 대단한 추켜세움까지는 아니더라도, 최소한 내가 가진 자랑거리는 반아이들에게 일러주어, 그게 새로 시작하는 그들과의 관계에 도움이 되기를 바랐다.
    그때 내게는 나름으로 내세울 만한 게 몇 있었다. 첫째로 공부, 일등은 그리 자주 못했지만, 그래도 나는 그 별난 서울의 일류 학교에서도 반에서 다섯 손가락 안에는 들었다. 선생님뿐만 아니라 아이들과의 관계에서도 내 이익을 지켜 주는 데 적지 않은 몫을 하던 내 은근한 자랑거리였다. 또 나는 그림에도 남다른 솜씨가 있었다. 역시 전국의 어린이 미술대회를 휩쓸었다 할 정도는 아니었어도, 서울시 규모의 대회에서 몇 번의 특선은 따낼 만했다. 내 성적과 어울러 그 점도 어머니는 몇 번이나 강조하는 듯했는데, 담임 선생은 그 모두를 무시해 버린 것이었다. 내 아버지의 직업도 경우에 따라서는 내게 힘이 될 만했다. 바람을 맞아도 호되게 맞아 서울에서 거기까지 날려가기는 했어도, 내 아버지는 그 작은 읍으로 봐서는 몇 손가락 안에 들 만큼 직급 높은 공무원이었다.
    야속스럽기는 아이들도 담임 선생님과 마찬가지다. 서울에서는 새로운 전입생이 들어오면 아이들은 쉬는 시간이 되기 바쁘게 그를 빙 둘러싸고 이것 저것 묻기 마련이었다. 공부를 잘하는가, 힘은 센가, 집은 잘 사는가, 따위로 말하자면 나중 그 아이와 맺게 될 관계의 기초가 될 자료 수집인 셈이다. 그런데 그 새로운 급우들은 새로운 담임 선생과 마찬가지로 그런 쪽으로는 별로 관심이 없었다. 쉬는 시간에는 저만치서 힐끗힐끗 훔쳐 보기만 하다가 점심 시간이 되어서야 몇 명 몰려와 묻는다는 게 고작 전차를 타봤는가, 남대문을 보았는가 따위였고, 부러워하거나 감탄한다는 것도 기껏 나만이 가진 고급한 학용품 따위였다. 
    하지만 삼십 년이 가까워지는 오늘까지도 그 전학 첫날을 생생하게 기억하도록 만든 것은 아무래도 엄석대(嚴石大)와의 만남이 될 것이다.
    「모두 저리 비켜!」
    아이들이 나를 둘러싸고 앞서 말한 그런 실없는 것들이나 묻고 있는데, 문득 그들 등뒤에서 그런 소리가 나지막이 들려 왔다. 잘 모르는 나에게는 담임 선생이 들어온 것이나 아닐까 생각이 들 만큼 어른스런 변성기(變聲期)의 목소리였다. 아이들이 움찔하며 물러서는데 나까지 놀라 돌아보니 가운데 맨 뒤쪽에 한 아이가 버티고 앉아 우리 쪽을 지그시 바라보고 있었다.
    아직 같은 반이 된 지 한 시간밖에 안됐지만 그 아이만은 나도 알아볼 수 있었다! 담인 선생님과 내가 처음 교실로 들어왔을 때 차렷, 경계를 소리친 것으로 보아 급장인 듯한 아이였다. 그러나 내가 그를 엇비슷한 육십 명 가운데 금방 구분해 낼 수 있었던 것은 그가 급장이어서라기 보다는 다른 아이들과 머리통 하나는 더 있어 뵐 만큼 큰 앉은 키와 쏘는 듯한 눈빛 때문이었다.
    「한병태랬지? 이리 와봐.」
    '''

    print(extractive_summarization(text))