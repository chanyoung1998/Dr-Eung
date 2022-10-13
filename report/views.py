from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import BookReport
from .serializer import BookReportSerializer, ReportListSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def report_list_view(request):
    serializer = ReportListSerializer(request.user)
    return Response(serializer.data)

class ReportView(APIView):
    def get(self, request):
        users = BookReport.objects.all()
        serializer = BookReportSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

