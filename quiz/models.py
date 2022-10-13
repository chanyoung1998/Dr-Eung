from django.db import models
from book.models import Book

class Quiz(models.Model):
    book = models.ForeignKey(Book, related_name='quiz', on_delete=models.CASCADE, default=0)
    question = models.CharField(max_length=255, default="")
    answer = models.CharField(max_length=255, default="")
    choice = models.CharField(max_length=255, default="")

    def __str__(self):
        return f"Quiz of {self.book.title}"
