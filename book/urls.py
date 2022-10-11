from django.urls import path
from .views import *

app_name = 'book'

urlpatterns = [
    path('', ReadingView.as_view()),
    path('booklist/', BookListView.as_view()),
]