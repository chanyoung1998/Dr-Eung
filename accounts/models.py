from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from math import exp, log

class User(AbstractUser):
    name = models.CharField(max_length=45, null=False, default="")
    nickname = models.CharField(max_length=45, blank=True, default="")
    school = models.CharField(max_length=45, blank=True, default="")
    introduction = models.TextField(max_length=255, blank=True, default="")
    ability = ArrayField(
        models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]),
        size=5,                                     # 이해(퀴즈점수), 맞춤법(hanspell점수), 표현, 구성, 내용
        default=list([0,0,0,0,0])
    )
    genres = ArrayField(
        models.IntegerField(default=0, validators=[MinValueValidator(0)]),
        size=5,                                     # 소설, 수필, 희곡, 전기, 비문학
        default=list([0,0,0,0,0])
    )
    tier = models.SmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    background = models.CharField(default="", blank=True, max_length=255)
    accessories = models.CharField(default="", blank=True, max_length=255)

    def updateScore(self, score):
        n = len(self.report.filter(complete=True))
        for i in range(5):
            self.ability[i] = (self.ability[i] / scale(n-1) + score[i]) // (n+1)
            self.ability[i] *= scale(n)
            if self.ability[i] > 100:
                self.ability[i] = 100

        if sum(self.genres) >= 100 and sum(self.score) / 5 >= 80:
            self.tier = 5
        elif sum(self.genres) >= 70 and sum(self.score) / 5 >= 60:
            self.tier = 4
        elif sum(self.genres) >= 40 and sum(self.score) / 5 >= 30:
            self.tier = 3
        elif sum(self.genres) >= 15 and sum(self.score) / 5 >= 15:
            self.tier = 2
        elif sum(self.genres) >= 5:
            self.tier = 1


    def __str__(self):
        return self.name

def scale(x):
    return (-exp(-(x+1)/10 + log(100)) + 100) / 100
