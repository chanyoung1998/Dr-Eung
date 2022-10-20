from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.postgres.fields import ArrayField

from book.models import Book

class BookReport(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='report', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='report' , on_delete=models.CASCADE, default="")
    step = models.SmallIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(3)])
    format = models.CharField(max_length=45, blank=True)
    keyword = ArrayField(
        models.CharField(max_length=45, blank=True),
        size=5,
        default=list,
        blank=True,
    )
    page = models.SmallIntegerField(default=1, validators=[MinValueValidator(1)])
    complete = models.BooleanField(default=False)
    bookmark = models.BooleanField(default=False)
    time = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('author', 'book'),)

    def __str__(self):
        return f"{self.author.nickname}의 감상문 - [{self.book.title}]"

class Text(models.Model):
    textID = models.OneToOneField(BookReport, related_name='contents', on_delete=models.CASCADE, primary_key=True)
    original = models.TextField()
    correct = models.TextField()
    feedback = models.TextField()

    def __str__(self):
        return f"{self.textID.author.nickname}의 감상문 - [{self.textID.book.title}]"

    @receiver(post_save, sender=BookReport)
    def create_user_ability(sender, instance, created, **kwargs):
        if created:
            Text.objects.create(textID=instance)