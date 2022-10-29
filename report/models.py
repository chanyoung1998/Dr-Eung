from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator

from book.models import Book

class BookReport(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='report', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='report' , on_delete=models.CASCADE, default="")
    step = models.SmallIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(3)])
    format = models.CharField(max_length=45, blank=True)
    page = models.SmallIntegerField(default=1, validators=[MinValueValidator(1)])
    complete = models.BooleanField(default=False)
    bookmark = models.BooleanField(default=False)
    quiz_score = models.SmallIntegerField(default=0, validators=[MinValueValidator(0)])
    time = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('author', 'book'),)

    def __str__(self):
        return f"{self.author.nickname} - [{self.book.title}]"

class Text(models.Model):
    report = models.OneToOneField(BookReport, related_name='contents', on_delete=models.CASCADE, primary_key=True)
    original = models.TextField()
    correct = models.TextField()
    feedback = models.TextField()

    def __str__(self):
        return f"{self.report.author.nickname}의 감상문 - [{self.report.book.title}]"

class Activity(models.Model):
    text = models.ForeignKey(Text, related_name='activity', on_delete=models.CASCADE, default="")
    chapter = models.SmallIntegerField(default=0)
    question_set = ArrayField(models.SmallIntegerField(), size=3, default=list)
    keyword = models.CharField(max_length=255, default="", blank=True)
    reason = models.TextField(blank=True)
    summary = models.TextField(blank=True)
    feeling = models.TextField(blank=True)

    def __str__(self):
        return f"{self.text} : chapter{self.chapter} 활동"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['text', 'chapter'], name="text_chapter")
        ]