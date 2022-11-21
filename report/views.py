from rest_framework import status, generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .serializer import *

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def report_list_view(request):
    serializer = ReportListSerializer(request.user)
    return Response(serializer.data)

class ActivityView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, title, chapter):
        text = get_object_or_404(BookReport, author=request.user, book__title=title).contents

        if not text.activity.filter(chapter=chapter):
            Activity.objects.create(text=text, chapter=chapter)
        activity = text.activity.get(chapter=chapter)

        serializer = ActivitySerializer(activity)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, title, chapter):
        text = get_object_or_404(BookReport, author=request.user, book__title=title).contents
        activity = text.activity.get(chapter=chapter)

        if request.POST is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = ActivitySerializer(data={
            "activity": activity,
            "content": request.POST
        })

        serializer.is_valid(raise_exception=True)
        if serializer.validated_data == -1:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.validated_data)

class ReportView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, title):
        text = get_object_or_404(BookReport, author=request.user, book__title=title).contents
        serializer = WritingTextSerializer(text)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, title):
        text = get_object_or_404(BookReport, author=request.user, book__title=title).contents

        if not request.POST:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        original = request.POST["original"]
        serializer = WritingTextSerializer(data={
            "user": request.user,
            "text": text,
            "original": original
        })
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class FeedbackView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, title):
        text = get_object_or_404(BookReport, author=request.user, book__title=title).contents
        serializer = TextSerializer(text)
        return Response(serializer.data, status=status.HTTP_200_OK)
