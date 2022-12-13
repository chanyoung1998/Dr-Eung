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
    serializer_class = BookSerializer
    pagination_class = BookListPagination

class BookView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reading_view(request, title, chapter):
    if not 'page' in request.GET:
        raise ParseError("query is not correct - \"/?page=<int>\"")

    page = request.GET['page']

    serializer = ContentSerializer(
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
    if res.text == "":
        res = agent.get(f"{base_url}?key={key}&q={word}&req_type=json&num=10&advanced=y&method=include&type1=word,phrase,idiom")

    if res.text == "{}":
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(res.json()["channel"], status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def keyword_view(request, title):
    if 'num' in request.GET:
        num = int(request.GET['num'])
    else:
        num = 9

    serializer = KeywordSerializer(data={'title': title, 'num': num})
    serializer.is_valid(raise_exception=True)
    return Response(serializer.validated_data, status=status.HTTP_200_OK)
