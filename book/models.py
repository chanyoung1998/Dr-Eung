from django.db import models

class Book(models.Model):
    title = models.CharField(primary_key=True, max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=45)
    contents = models.TextField()

    def __str__(self):
        return self.title