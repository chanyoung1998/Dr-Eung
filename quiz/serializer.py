from rest_framework import serializers
from .models import Quiz

class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz
        fields = ['quiz_number', 'question', 'choice']

class AnswerSerializer(serializers.Serializer):
    def to_internal_value(self, data):
        user = data['user']
        quiz = data['quiz']
        answer = data['answer']

        if quiz.answer == int(answer):
            report = quiz.content.book.report.get(author=user)
            if report.curr_chapter <= quiz.content.chapter:
                report.quiz_score += 1
                report.save()
            return "정답입니다!"
        else:
            return {"hint": quiz.content.content_lines[quiz.hint[0]:quiz.hint[1]]}

