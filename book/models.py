from django.db import models
from django.core.validators import MinValueValidator

LINES = 20

class Book(models.Model):
    title = models.CharField(primary_key=True, max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=45)
    contents = models.TextField()
    total_pages = models.IntegerField(validators=[MinValueValidator(1)])

    def __str__(self):
        return self.title