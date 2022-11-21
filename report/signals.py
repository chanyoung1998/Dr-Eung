from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BookReport, Text

@receiver(post_save, sender=BookReport)
def create_text(sender, instance, created, **kwargs):
    if created:
        Text.objects.create(report=instance)