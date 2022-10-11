from django.db import models

class Book(models.Model):
    Title = models.CharField(primary_key=True, max_length=255)
    Author = models.CharField(max_length=255)
    Genre = models.CharField(max_length=45)
    Contents = models.TextField()

    def __str__(self):
        return self.Title
