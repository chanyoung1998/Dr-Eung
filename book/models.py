from django.db import models
from django.contrib.postgres.fields import ArrayField

class Book(models.Model):
    title = models.CharField(primary_key=True, max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=45)
    chapters = models.IntegerField(default=0)
    description = models.CharField(max_length=255)
    keywords = ArrayField(
        models.CharField(max_length=255),
        default=list,
        blank=True,
    )
    # img = models.URLField()

    def __str__(self):
        return self.title

class Content(models.Model):
    book = models.ForeignKey(Book, related_name='content', on_delete=models.CASCADE)
    chapter = models.SmallIntegerField(default=0)
    content = models.TextField()
    content_lines = ArrayField(
        models.TextField(),
        default=list,
        blank=True,
    )
    pages = models.SmallIntegerField(default=0)
    quizzes = models.SmallIntegerField(default=0)


    def __str__(self):
        return f"{self.book} chapter{self.chapter}"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['book', 'chapter'], name="book_chapter")
        ]