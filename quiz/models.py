from django.db import models
from book.models import Book

class Quiz(models.Model):
    BookID = models.ForeignKey(Book, related_name='quiz', on_delete=models.CASCADE, default=0)
    Question = models.CharField(max_length=255, default="")
    Answer = models.CharField(max_length=255, default="")
    Choice = models.CharField(max_length=255, default="")

    def __str__(self):
        return f"Quiz of {self.BookID.Title}"
