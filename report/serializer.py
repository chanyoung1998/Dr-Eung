from rest_framework import serializers
from .models import *

from random import randrange

QUESTION_SET = {
    "keyword": ("keyword question 1", "keyword question 2", "keyword question 3"),
    "summary": ("summary question 1", "summary question 2", "summary question 3"),
    "feeling": ("feeling question 1", "feeling question 2", "feeling question 3")
}
KEYWORD = 3
SUMMARY = 3
FEELING = 3

class ReportListSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        user = obj
        reports = BookReport.objects.filter(author=user).order_by('-time').values()

        result = {}
        for i, report in enumerate(reports):
            result[str(i+1)] = {
                "책 제목": report['book_id'],
                "작성완료": report['complete'],
                "즐겨찾기": report['bookmark']
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
            "summary": QUESTION_SET["summary"][summary_question],
            "feeling": QUESTION_SET["feeling"][feeling_question]
        }

    def to_internal_value(self, data):
        activity = data["activity"]
        content = data["content"]

        if set(content.keys()) == set(["keyword", "reason", "summary", "feeling"]):
            activity.keyword=content["keyword"]
            activity.reason=content["reason"]
            activity.summary=content["summary"]
            activity.feeling=content["feeling"]
            activity.save()
            return "다음 챕터로"

        else:
            return -1

class WritingTextSerializer(serializers.Serializer):
    def to_representation(self, obj):
        activities = {}
        for activity in obj.activity.all():
            activities[str(activity.chapter)] = {
                QUESTION_SET["keyword"][activity.question_set[0]]: activity.keyword,
                "reason": activity.reason,
                QUESTION_SET["summary"][activity.question_set[1]]: activity.summary,
                QUESTION_SET["feeling"][activity.question_set[2]]: activity.feeling
            }
        return {
            "original": obj.original,
            "activities": activities
        }

    def to_internal_value(self, data):
        text = data["text"]
        text.original = data["original"]
        text.save()
        return "감상문이 저장되었습니다"

class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        exclude = ['report']
