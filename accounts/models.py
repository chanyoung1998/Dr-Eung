from django.db import models

class User(models.Model):
    UserID = models.BigIntegerField(primary_key=True)
    PassWord = models.CharField(max_length=255)
    Nickname = models.CharField(max_length=45)
    Ability = models.IntegerField()

    def __str__(self):
        return self.Nickname

class Text(models.Model):
    TextID = models.BigIntegerField(primary_key=True)
    Original = models.TextField()
    Correct = models.TextField()
    Feedback = models.TextField()

class Book(models.Model):
    BookID = models.BigIntegerField(primary_key=True)
    Title = models.CharField(max_length=255)
    Author = models.CharField(max_length=255)
    Genre = models.CharField(max_length=45)
    Contents = models.TextField()

    def __str__(self):
        return self.Title

class Quiz(models.Model):
    BookID = models.ForeignKey(Book, primary_key=True, on_delete=models.CASCADE)
    Question = models.CharField(max_length=255)
    Answer = models.CharField(max_length=255)
    Choice = models.CharField(max_length=255)

    def __str__(self):
        return f"Quiz of {self.BookID.Title}"

class BookReport(models.Model):
    UserID = models.ForeignKey(User, primary_key=True, on_delete=models.CASCADE)
    BookID = models.ForeignKey(Book, on_delete=models.CASCADE)
    TextID = models.ForeignKey(Text, on_delete=models.CASCADE)
    Step = models.SmallIntegerField()
    Format = models.SmallIntegerField()
    Keyword = models.TextField()
    Page = models.SmallIntegerField()
    Complete = models.BooleanField()
    Bookmark = models.BooleanField()
    Time = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('UserID', 'BookID'),)

    def __str__(self):
        return f"BookReport of {self.BookID.Title}"

