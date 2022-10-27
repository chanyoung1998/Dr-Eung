from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    nickname = models.CharField(max_length=45, null=False, default="")
    ability = ArrayField(
        models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]),
        size=5,
        default=list,
    )

    def __str__(self):
        return self.nickname