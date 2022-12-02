from django.urls import path
from .views import *

app_name = 'book'

urlpatterns = [
    path('list/', BookListView.as_view()),
    path('dictionary/', dictionary_view),
    path('<str:title>/<int:chapter>/highlight', highlight_view),
    path('<str:title>/<int:chapter>/', reading_view),
    path('<str:title>/keywords/', keyword_view),
    path("<str:pk>/", BookView.as_view()),
]