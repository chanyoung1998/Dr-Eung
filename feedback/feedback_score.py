# -*- coding: utf-8 -*-
from eunjeon import Mecab
from hanspell import spell_checker
import pandas as pd
import numpy as np

class FeedBack_score():

    def __init__(self):
        self.mecab = Mecab()
        self.tag = {'NNG','NNP','NNB','NR','NP','VV','VA','MM','MAG','MAJ','XR'}
        self.stopwords = {'이', '있', '하', '것', '들', '그', '되', '수', '이', '보', '않', '없', '나', '사람', '주','아니', '등', '같', '우리', '때', '년', '가', '한', '지', '대하', '오', '말', '일', '그렇', '위하', '때문', '그것', '두', '말하', '알', '그러나', '받', '못하', '일', '그런', '또', '문제', '더', '사회','많', '그리고', '좋', '크', '따르', '중', '나오', '가지', '씨', '시키', '만들', '지금', '생각하','그러', '속', '하나', '집', '살', '모르', '적', '월', '데', '자신', '안', '어떤', '내', '경우', '명', '생각', '시간', '그녀', '다시', '이런', '앞', '보이', '번', '나', '다른', '어떻', '여자', '개', '들',  '사실', '이렇', '점', '싶', '말', '정도', '좀', '원', '잘', '통하', '소리', '놓'}
    def vocabulary_score(self,text):

        pos_tag_with_stopword = self.mecab.pos(text)
        pos_tag_without_stopword = []

        for word,tag in pos_tag_with_stopword:
            if word in self.stopwords:
                continue
            if tag in self.tag:   
                pos_tag_without_stopword.append((word,tag))

        unique_pos_tag_without_stopword = set(pos_tag_without_stopword)
        print(pos_tag_without_stopword)
        
        print('-'*50)
        print(unique_pos_tag_without_stopword)
        print("글에 포함된 총 형태소의 수",len(pos_tag_with_stopword))
        print("글에 포함된 의미있는 형태소의 수",len(pos_tag_without_stopword))
        print("글에 포함된 중복을 제외한 의미있는 형태소의 수",len(unique_pos_tag_without_stopword))
        return 

    #한번에 최대 500자까지 검사 가능
    def grammer_score(self,text):
        
        result = spell_checker.check(text)
        result =result.as_dict()
        print(result)
        words = result['words']
        errors = result['errors']
        return errors / len(words) * 100

    def content_score(self,text):
        #형식에 맞게 잘 작성했는지를 검사
        pass

    def cohesion_score(self,text):
        # 한국어 단어 시소러스 이용
        pass

    def comprehension_scoer(text):
        # 문제 풀이 내역을 바탕으로 맞은 문제와 틀린 문제의 비율을 계산할 예정
        pass

if __name__ == '__main__':

    fs = FeedBack_score()
    with open('../example/text4.txt','r',encoding='UTF8') as f:
        
        txt  = list(map(lambda x:x.strip(), f.read().split('\n')))
        text = ' '.join(txt)
    
    fs.vocabulary_score(text)
    print()
    fs.grammer_score(text)
    
