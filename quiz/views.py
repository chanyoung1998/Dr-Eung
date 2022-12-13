from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from .models import Quiz
from .serializer import QuizSerializer, AnswerSerializer

from rest_framework.pagination import PageNumberPagination
class QuizListPagination(PageNumberPagination):
    page_size = 5
class QuizListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    #print(title, chapter)
    #queryset = Quiz.objects.filter(book__title=title, chapter=chapter)
    serializer_class = QuizSerializer
    pagination_class = QuizListPagination

    lookup_url_kwarg = ["title", "chapter"]

    def get_queryset(self):
        print(self.kwargs.get(self.lookup_url_kwarg[0]))
        title = self.kwargs.get(self.lookup_url_kwarg[0])
        chapter = self.kwargs.get(self.lookup_url_kwarg[1])
        quizzes = Quiz.objects.filter(content__book__title=title, content__chapter=chapter)
        return quizzes


class QuizView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, title, chapter):
        if not 'quiz_number' in request.GET:
            raise ParseError("query is not correct - \"/?quiz_number=<int>\"")

        quiz_number = request.GET['quiz_number']
        quiz = get_object_or_404(Quiz, content__book__title=title, content__chapter=chapter, quiz_number=quiz_number)
        serializer = QuizSerializer(quiz)

        report = request.user.report.get(book__title=title)
        if report.step < 2:
            report.step = 2
            report.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, title, chapter):
        if not 'quiz_number' in request.GET:
            raise ParseError("query is not correct - \"/?quiz_number=<int>\"")

        if not "answer" in request.POST:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        quiz_number = request.GET['quiz_number']
        answer = request.POST['answer']
        quiz = get_object_or_404(Quiz, content__book__title=title, content__chapter=chapter, quiz_number=quiz_number)
        serializer = AnswerSerializer(data={
            "user": request.user,
            "quiz": quiz,
            "answer": answer
        })
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
