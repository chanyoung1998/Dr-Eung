from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination

from .serializer import *
import requests

class BookListPagination(PageNumberPagination):
    page_size = 10

class BookListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookListSerializer
    pagination_class = BookListPagination

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def book_search_view(request):
    if not 'title' in request.GET:
        raise ParseError("query is not correct - \"/?title=<str>\"")
    title = request.GET['title']
    serializer = BookSearchSerializer(data=title)
    serializer.is_valid(raise_exception=True)
    if serializer.validated_data:
        return Response(serializer.validated_data)
    return Response(status=status.HTTP_404_NOT_FOUND)

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
    if serializer.validated_data["status"] == 404:
        return Response(serializer.validated_data, status=status.HTTP_404_NOT_FOUND)
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dictionary_view(request):
    if not 'word' in request.GET:
        raise ParseError("query is not correct - \"/?word=<str>\"")

    word = request.GET['word']
    key = "89A09DC2FAD95241E4C880615F939362"
    base_url = "https://stdict.korean.go.kr/api/search.do"

    agent = requests.Session()
    res = agent.get(f"{base_url}?key={key}&q={word}&req_type=json&num=10")
    return Response(res.json()["channel"], status=status.HTTP_200_OK)
