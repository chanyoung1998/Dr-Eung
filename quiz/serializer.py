from rest_framework import serializers
from .models import Quiz

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['question', 'choice', 'hint', 'type']

class AnswerSerializer(serializers.Serializer):
    answer = serializers.CharField()