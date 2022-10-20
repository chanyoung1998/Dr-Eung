from rest_framework import generics
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


# class ReadingView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, title):
#         serializer = BookSerializer(request.user, title)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = BookSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reading_view(request, title, page):
    serializer = BookSerializer(
        data={'user': request.user,
              'title': title,
              'page': page})
    serializer.is_valid(raise_exception=True)
    return Response(serializer.validated_data)