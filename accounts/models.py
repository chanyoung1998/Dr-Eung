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


# class Ability(models.Model):
#     user = models.OneToOneField(User, related_name='ability', on_delete=models.CASCADE, primary_key=True)
#     vocabulary_score = models.IntegerField("어휘력", default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
#     grammar_score = models.IntegerField("문법", default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
#     coherence_score = models.IntegerField("응집성", default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
#     comprehension_score = models.IntegerField("이해력", default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
#     fluency_score = models.IntegerField("유창성", default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
#
#     @receiver(post_save, sender=User)
#     def create_user_ability(sender, instance, created, **kwargs):
#         if created:
#             Ability.objects.create(user=instance)
#
#     def __str__(self):
#         return self.user.nickname + "'s ability"