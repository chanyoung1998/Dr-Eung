from django.urls import path
from .views import *

app_name = 'book'

urlpatterns = [
    path('<str:title>/<int:chapter>-<int:page>/', reading_view),
    path('list/', BookListView.as_view()),
]