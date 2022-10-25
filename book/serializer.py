from rest_framework import serializers
from .models import Book
import kss
from math import ceil

LINES = 10

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

        book = Book.objects.get(title=title)
        report = book.report.get(author=user.pk)
        content = book.content.get(chapter=chapter).content

        if report.page < page:
            report.page = page
            report.save()

        paragraph = kss.split_sentences(content)
        pages = len(paragraph)
        contents = paragraph[(page-1) * LINES : page * LINES]
        return {f"page {page}": contents,
                "pages": ceil(pages/LINES)}
