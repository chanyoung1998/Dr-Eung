from rest_framework import serializers
from report.models import BookReport
from .signals import LINES
from .models import Book

class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('title', 'author', 'genre')

class BookSerializer(serializers.BaseSerializer):
    def to_internal_value(self, data):
        user = data['user']
        title = data['title']
        page = data['page']
        chapter = data['chapter']

        if not Book.objects.filter(title=title):
            return -1
        book = Book.objects.get(title=title)

        if not book.content.filter(chapter=chapter):
            return -1
        chapter = book.content.get(chapter=chapter)

        if not book.report.filter(author=user.pk):
            BookReport.objects.create(author=user, book=book)
        report = book.report.get(author=user.pk)

        if report.page < page:
            report.page = page
            report.save()

        contents = chapter.content_lines[(page-1) * LINES : page * LINES]
        return {f"page {page}": contents,
                "pages": chapter.pages}
