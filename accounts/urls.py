from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('register/id', id_view),
    path('MyPage/', profile_view),
]
