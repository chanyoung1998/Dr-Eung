from django.urls import path
from .views import *

app_name = 'quiz'

urlpatterns = [
    path('<str:title>/<int:quiz_number>/', QuizView.as_view()),
]