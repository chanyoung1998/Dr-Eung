from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Quiz
from book.models import Book
from .serializer import QuizSerializer, AnswerSerializer

class QuizView(generics.GenericAPIView):
    serializer_class = AnswerSerializer
    # permission_classes = [IsAuthenticated]
    def get(self, request, title, quiz_number):
        quiz = Quiz.objects.get(book=Book.objects.get(title=title), quiz_number=quiz_number)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

    def post(self, request, title, quiz_number):
        print(request.data['answer'])
        return Response(status=status.HTTP_201_CREATED)
        # serializer = self.get_serializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
