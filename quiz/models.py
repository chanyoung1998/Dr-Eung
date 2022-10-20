from django.db import models
from book.models import Book
from django.contrib.postgres.fields import ArrayField

class Quiz(models.Model):
    book = models.ForeignKey(Book, related_name='quiz', on_delete=models.CASCADE, default=0)
    quiz_number = models.SmallIntegerField(default=0, )
    question = models.CharField(max_length=255, default="")
    answer = models.CharField(max_length=255, default="")
    choice = ArrayField(
        models.CharField(max_length=255, default=""),
        size=5,
        default=list,
        blank=True,
    )
    hint = models.TextField(default="")
    type = models.BooleanField("객관식", default=True)
    chapter = models.SmallIntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['book', 'quiz_number'], name="book_quiz_number")
        ]

    def __str__(self):
        return f"Quiz of {self.book.title}"
