from django.urls import path
from .views import *

app_name = 'quiz'

urlpatterns = [
    path('<str:title>/<int:chapter>/', QuizView.as_view()),
]