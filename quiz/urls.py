from django.urls import path
from .views import *

app_name = 'quiz'

urlpatterns = [
    path('', QuizView.as_view()),
]