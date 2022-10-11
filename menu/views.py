from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ProfileSeializer

class ProfileView(APIView):
    def get(self, request):
        # user = userinfo <- 로그인한 유저의 정보를 받아와야 함
        serializer = ProfileSeializer("""user""")
        return Response(serializer.data)
