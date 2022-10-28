from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import Book
from .serializer import BookSerializer, BookListSerializer

class BookListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookListSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reading_view(request, title, chapter, page):
    serializer = BookSerializer(
        data={'user': request.user,
              'title': title,
              'chapter': chapter,
              'page': page})
    serializer.is_valid(raise_exception=True)
    if serializer.validated_data == -1:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.validated_data)