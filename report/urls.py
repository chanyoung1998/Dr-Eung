from django.urls import path
from .views import *

app_name = 'report'

urlpatterns = [
    path('list/', report_list_view),
    path('<str:title>/', ReportView.as_view()),
    path('<str:title>/feedback/', FeedbackView.as_view()),
    path('<str:title>/<int:chapter>/activity/', ActivityView.as_view()),
]