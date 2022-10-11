from django.db import models
from django.conf import settings
from book.models import Book

class Text(models.Model):
    TextID = models.CharField(primary_key=True, max_length=45)
    Original = models.TextField()
    Correct = models.TextField()
    Feedback = models.TextField()

    def __str__(self):
        return self.TextID


class BookReport(models.Model):
    UserID = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='book_report', on_delete=models.CASCADE)
    BookID = models.ForeignKey(Book, on_delete=models.CASCADE, default="")
    TextID = models.OneToOneField(Text, on_delete=models.CASCADE, unique=True, null=True)
    Step = models.SmallIntegerField(default=0)
    Format = models.SmallIntegerField(default=0)
    Keyword = models.TextField(null=True)
    Page = models.SmallIntegerField(default=0)
    Complete = models.BooleanField(default=False)
    Bookmark = models.BooleanField(default=False)
    Time = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('UserID', 'BookID'),)

    def __str__(self):
        return f"BookReport of {self.BookID.Title}"

