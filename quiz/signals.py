from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Quiz

@receiver(post_save, sender=Quiz)
def post_save_quiz(sender, **kwargs):
    quiz = kwargs['instance']
    quiz.content.quizzes += 1
    quiz.content.save()

@receiver(post_delete, sender=Quiz)
def post_delete_quiz(sender, **kwargs):
    quiz = kwargs['instance']
    quiz.content.quizzes -= 1
    quiz.content.save()