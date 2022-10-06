from django.db import models

class User(models.Model):
    UserID = models.CharField(primary_key=True, max_length=45)
    PassWord = models.CharField(max_length=255)
    Nickname = models.CharField(max_length=45)
    Ability = models.IntegerField()

    def __str__(self):
        return self.Nickname
