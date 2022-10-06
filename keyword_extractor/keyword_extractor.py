from eunjeon import Mecab
from sentence_transformers import SentenceTransformer,util
from sklearn.feature_extraction.text import CountVectorizer

def extract_keyword(text,top_n=3):
    model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS') 
    mecab = Mecab()
    nouns = (list(set(mecab.nouns(text)))) # get Nouns from text
    doc_embedding = model.encode([text]) # encode text into vector
    nouns_embedding = model.encode(nouns) # encode each nouns into vector
    distances = util.cos_sim(doc_embedding, nouns_embedding) # compute distances between text and each nouns
    keywords = [nouns[index] for index in distances.argsort()[0][-top_n:]] # extract top_n keywords
    
    return keywords

def extract_keyword_ngram(text,top_n=3,ngram_range=(1,2)):
    model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS') 
    mecab = Mecab()
    nouns = ' '.join(mecab.nouns(text)) # get Nouns-String
    cv = CountVectorizer(ngram_range=ngram_range).fit([nouns]) # compute ngram range nouns using CountVectorizer
    candidates = cv.get_feature_names_out()
    doc_embedding = model.encode([text]) # encode text into vector
    candidates_embedding = model.encode(candidates) # encode each candidates into vector
    distances = util.cos_sim(doc_embedding, candidates_embedding) # compute distances between text and each nouns
    keywords = [candidates[index] for index in distances.argsort()[0][-top_n:]] # extract top_n keywords

    return keywords

if __name__ == '__main__':

    text = """
    드론 활용 범위도 점차 확대되고 있다. 최근에는 미세먼지 관리에 드론이 활용되고 있다.
    서울시는 '미세먼지 계절관리제' 기간인 지난달부터 오는 3월까지 4개월간 드론에 측정장치를 달아 미세먼지 집중 관리를 실시하고 있다.
    드론은 산업단지와 사업장 밀집지역을 날아다니며 미세먼지 배출 수치를 점검하고, 현장 모습을 영상으로 담는다.
    영상을 통해 미세먼지 방지 시설을 제대로 가동하지 않는 업체와 무허가 시설에 대한 단속이 한층 수월해질 전망이다.
    드론 활용에 가장 적극적인 소방청은 광범위하고 복합적인 재난 대응 차원에서 드론과 관련 전문인력 보강을 꾸준히 이어가고 있다.
    지난해 말 기준 소방청이 보유한 드론은 총 304대, 드론 조종 자격증을 갖춘 소방대원의 경우 1,860명이다.
    이 중 실기평가지도 자격증까지 갖춘 ‘드론 전문가’ 21명도 배치돼 있다.
    소방청 관계자는 "소방드론은 재난현장에서 영상정보를 수집, 산악ㆍ수난 사고 시 인명수색·구조활동,
    유독가스·폭발사고 시 대원안전 확보 등에 활용된다"며
    "향후 화재진압, 인명구조 등에도 드론을 활용하기 위해 연구개발(R&D)을 하고 있다"고 말했다.
    """

    print(extract_keyword(text))
