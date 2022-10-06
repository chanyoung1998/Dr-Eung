from django.urls import path
from .views import *
from .models import *
from django.contrib.auth import views as auth_views


app_name = 'accounts'

urlpatterns = [
    path('', login),
]