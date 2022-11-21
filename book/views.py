from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .serializer import *

class BookListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookListSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reading_view(request, title, chapter):
    if not 'page' in request.GET:
        raise ParseError("query is not correct - \"/?page=<int>\"")

    page = request.GET['page']

    serializer = BookSerializer(
        data={'user': request.user,
              'title': title,
              'chapter': chapter,
              'page': page})
    serializer.is_valid(raise_exception=True)
    if serializer.validated_data == -1:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.validated_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def highlight_view(request, title, chapter):
    if not 'page' in request.GET:
        raise ParseError("query is not correct - \"/?page=<int>\"")

    page = request.GET['page']
    serializer = HighlightIndexSerializer(
        data={'title': title,
              'chapter': chapter,
              'page': page})
    serializer.is_valid(raise_exception=True)
    return Response(serializer.validated_data)
