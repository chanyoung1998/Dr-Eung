from rest_framework import serializers
from .models import *
from .apps import ReportConfig

from random import randrange

GENRE = {"소설": 0, "수필": 1, "희곡": 2, "전기": 3, "비문학": 4}

QUESTION_SET = {
    "keyword": ("이번 단원에서 가장 기억에 남는 단어는 무엇이었나요?", "이번 단원에서 가장 중요하다고 생각하는 단어를 적어보세요!",
                "이번 단원에서 가장 인상깊었던 키워드는 무엇이었나요?", "이번 단원에서는 무엇이 가장 기억에 남나요?"),
    "reason": "왜 그렇게 생각했나요?",
    "summary": ("이번 단원에서 있었던 일을 한 문장으로 정리해 보세요!", "앞에서 적은 키워드를 생각하면서 이번 단원을 요약 해 보세요!",
                "이번 단원에서 가장 기억에 남는 내용을 적어보세요!", "이번 단원에서 어떤 일이 있었는지 엉박사에게 설명 해 보세요!"),
    "feeling": ("이번 단원을 읽고 어떤 생각이 들었나요? 자유롭게 적어보세요!", "앞에서 적은 키워드에 대해서 어떻게 생각하는지 적어보세요!",
                "앞에서 적은 내용을 떠올리면서 느낀점을 간단하게 정리 해 보세요!", "이번 단원을 읽고 드는 생각을 자유롭게 적어보세요!")
}
KEYWORD = 4
SUMMARY = 4
FEELING = 4

MAX_SCORE = 3


class ReportListSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        user = obj
        reports = BookReport.objects.filter(author=user).order_by('-time').values()

        result = {}
        for i, report in enumerate(reports):
            result[str(i + 1)] = {
                "책 제목": report['book_id'],
                "감상문 제목": report['title'],
                "bookmark": report['bookmark'],
                "complete": report['complete'],
                "info": {
                    "state": report['step'],
                    "current_page": report['page'],
                    "current_chapter": report['curr_chapter'],
                    "format": report['format']
                }
                # 이미지 주소: report.book.img
            }

        return result


class ActivitySerializer(serializers.Serializer):

    def to_representation(self, obj):
        activity = obj

        keyword_question = randrange(0, KEYWORD)
        summary_question = randrange(0, SUMMARY)
        feeling_question = randrange(0, FEELING)
        activity.question_set = [keyword_question, summary_question, feeling_question]
        activity.save()

        return {
            "keyword": QUESTION_SET["keyword"][keyword_question],
            "reason": QUESTION_SET["reason"],
            "summary": QUESTION_SET["summary"][summary_question],
            "feeling": QUESTION_SET["feeling"][feeling_question],
            "keyword_answer": activity.keyword,
            "reason_answer": activity.reason,
            "summary_answer": activity.summary,
            "feeling_answer": activity.feeling
        }

    def to_internal_value(self, data):
        activity = data["activity"]
        content = data["content"]

        if set(content.keys()) == set(["keyword", "reason", "summary", "feeling"]):
            activity.keyword = content["keyword"]
            activity.reason = content["reason"]
            activity.summary = content["summary"]
            activity.feeling = content["feeling"]
            activity.save()
            return "다음 챕터로"

        else:
            return -1


class WritingTextSerializer(serializers.Serializer):
    def to_representation(self, obj):
        text = obj
        activities = {}
        for activity in obj.activity.all():
            activities[str(activity.chapter)] = {
                "keyword": [QUESTION_SET["keyword"][activity.question_set[0]], activity.keyword],
                "reason": [QUESTION_SET["reason"], activity.reason],
                "summary": [QUESTION_SET["summary"][activity.question_set[1]], activity.summary],
                "feeling": [QUESTION_SET["feeling"][activity.question_set[2]], activity.feeling]
            }

        text.report.step = 4
        text.report.save()

        return {
            "original": text.original,
            "activities": activities
        }

    def to_internal_value(self, data):
        text = data["text"]
        text.original = data["original"]

        correct = ReportConfig.model.spellCheck(text.original)
        text.correct = correct["correct"]
        #text.correct = "\n".join(correct["correct"].split('.'))
        print(text.correct)

        feedback = ReportConfig.model.getFeedBack(text.correct, correct["score"])
        text.feedback = feedback["feedback"]

        text.save()

        user = data["user"]

        score = [
            int(text.report.quiz_score / (text.report.book.chapters * 5) * 100),    # 퀴즈 점수
            correct["score"],                                                       # 맞춤법 점수
            int((sum(feedback["score"][:3]) / (3 * MAX_SCORE)) * 100),              # 표현 점수
            int((sum(feedback["score"][3:7]) / (4 * MAX_SCORE)) * 100),             # 구성 점수
            int((sum(feedback["score"][7:]) / (4 * MAX_SCORE)) * 100),              # 내용 점수
        ]
        user.updateScore(score)

        if text.report.complete is False:
            user.genres[GENRE[text.report.book.genre]] += 1

        user.save()

        report = text.report
        report.title = data["title"]
        report.format = data["format"]
        report.complete = True
        report.save()

        return "감상문이 저장되었습니다"


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        exclude = ['report']

class ReportSerializer(serializers.ModelSerializer):
    contents = TextSerializer()

    class Meta:
        model = BookReport
        fields = ['format', 'title', 'contents']
