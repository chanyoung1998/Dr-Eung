from django.db import models

class User(models.Model):
    UserID = models.BigIntegerField(primary_key=True)
    PassWord = models.CharField(max_length=255)
    Nickname = models.CharField(max_length=45)
    Abiity = models.IntegerField()


class BookReport(models.Model):
    UserID = models.ForeignKey(User.UserID, primary_key=True, on_delete=models.CASCADE)
    BookID = models.BigIntegerField(primary_key=True)
    TextID = models.ForeignKey("Text", on_delete=models.CASCADE)
    Step = models.SmallIntegerField()
    Format = models.SmallIntegerField()
    Keyword = models.TextField()
    Page = models.SmallIntegerField()
    Complete = models.BooleanField()
    Bookmark = models.BooleanField()
    Time = models.DateTimeField()

class Text(models.Model):
    # TextID = models.ForeignKey(BookReport.TextID, primary_key=True, on_delete=models.CASCADE)
    TextID = models.BigIntegerField(primary_key=True)
    Original = models.TextField()
    Correct = models.TextField()
    Feedback = models.TextField()

class Book(models.Model):
    BookID = models.ForeignKey(BookReport.BookID, primary_key=True, on_delete=models.CASCADE)
    Title = models.CharField(max_length=255)
    Author = models.CharField(max_length=255)
    Genre = models.CharField(max_length=45)
    Contents = models.TextField()

class Quiz(models.Model):
    BookID = models.ForeignKey(Book.BookID, primary_key=True, on_delete=models.CASCADE)
    Question = models.CharField(max_length=255)
    Answer = models.CharField(max_length=255)
    Choice = models.CharField(max_length=255)