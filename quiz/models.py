from django.db import models
from book.models import Book
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator

class Quiz(models.Model):
    book = models.ForeignKey(Book, related_name='quiz', on_delete=models.CASCADE, default=0)
    quiz_number = models.SmallIntegerField(default=0, validators=[MinValueValidator(1)])
    question = models.CharField(max_length=255, default="")
    answer = models.SmallIntegerField(null=False, default=1, validators=[MinValueValidator(1), MaxValueValidator(5)])
    choice = ArrayField(
        models.CharField(max_length=255, default=""),
        size=5,
        default=list,
        blank=True,
    )
    hint = models.TextField(default="")
    chapter = models.SmallIntegerField(default=1, null=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['book', 'quiz_number'], name="book_quiz_number")
        ]

    def __str__(self):
        return f"Quiz of {self.book.title}"
