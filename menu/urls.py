from django.urls import path
from .views import *

app_name = 'menu'

urlpatterns = [
    path('mypage/', ProfileView.as_view()),
]