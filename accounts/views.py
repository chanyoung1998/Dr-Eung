from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import *
from .serializer import UserSerializer

# @csrf_exempt
@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializers = UserSerializer(users, many=True)
        # return JsonResponse(serializers.data, safe=False)
        return Response(serializers.data)
    elif request.method == 'POST':
        # data = JSONParser().parse(request)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            # return JsonResponse(serializer.data, status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # return JsonResponse(serializer.errors, status=400)

class RegisterView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
