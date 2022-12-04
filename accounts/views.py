from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import User
from .serializer import *
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data
        return Response({"token": token.key}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    serializer = ProfileSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
def id_view(request):
    username = request.GET["id"]
    if User.objects.filter(username=username).exists():
        return Response(True, status=status.HTTP_200_OK)
    return Response(False, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def img_update_view(request):
    user = request.user
    bg = request.data["bg"]
    acc = request.data["acc"]
    serializer = ImgSerializer(data={"user": user, "bg": bg, "acc": acc})
    serializer.is_valid(raise_exception=True)
    return Response(serializer.validated_data, status=status.HTTP_200_OK)