from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from book.models import Book

class BookReport(models.Model):
    Author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='report', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='report' , on_delete=models.CASCADE, default="")
    Step = models.SmallIntegerField(default=0)
    Format = models.SmallIntegerField(default=0)
    Keyword = models.TextField(null=True)
    Page = models.SmallIntegerField(default=0)
    Complete = models.BooleanField(default=False)
    Bookmark = models.BooleanField(default=False)
    Time = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('Author', 'book'),)

    def __str__(self):
        return f"{self.Author.Nickname}의 감상문 - [{self.book.Title}]"

class Text(models.Model):
    TextID = models.OneToOneField(BookReport, related_name='contents', on_delete=models.CASCADE, primary_key=True)
    Original = models.TextField()
    Correct = models.TextField()
    Feedback = models.TextField()

    def __str__(self):
        return f"{self.TextID.Author.Nickname}의 감상문 - [{self.TextID.book.Title}]"

    @receiver(post_save, sender=BookReport)
    def create_user_ability(sender, instance, created, **kwargs):
        if created:
            Text.objects.create(TextID=instance)