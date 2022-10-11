from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    Nickname = models.CharField(max_length=45, null=False, default="")
    Ability = models.IntegerField(default=0)

    def __str__(self):
        return self.Nickname
