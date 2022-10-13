from django.urls import path
from .views import *

app_name = 'report'

urlpatterns = [
    path('', ReportView.as_view()),
    path('list/', report_list_view),
]