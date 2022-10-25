from rest_framework import generics
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Quiz
from .serializer import QuizSerializer, AnswerSerializer

class QuizView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, title, chapter):
        if not 'quiz_number' in request.GET:
            raise ParseError("문항을 찾을 수 없음")
        quiz_number = request.GET['quiz_number']
        quiz = Quiz.objects.filter(book=title).get(chapter=chapter, quiz_number=quiz_number)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

    def post(self, request, title, chapter):
        quiz_number = request.POST['quiz_number']
        answer = request.POST['answer']
        quiz = Quiz.objects.filter(book=title).get(chapter=chapter, quiz_number=quiz_number)
        serializer = AnswerSerializer(data={
            "user": request.user,
            "quiz": quiz,
            "answer": answer
        })
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)
