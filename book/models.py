from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.postgres.fields import ArrayField


class Book(models.Model):
    title = models.CharField(primary_key=True, max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=45)
    total_chapters = models.IntegerField(validators=[MinValueValidator(1)])

    def __str__(self):
        return self.title

class Content(models.Model):
    book = models.ForeignKey(Book, related_name='content', on_delete=models.CASCADE)
    chapter = models.SmallIntegerField(default=0)
    content = models.TextField()

    def __str__(self):
        return f"{self.book.title} chapter{self.chapter}"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['book', 'chapter'], name="book_chapter")
        ]