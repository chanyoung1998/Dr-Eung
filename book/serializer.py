from rest_framework import serializers
from report.models import BookReport
from .models import Book, LINES

import kss

class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('title', 'author', 'genre')

class BookSerializer(serializers.BaseSerializer):
    def to_internal_value(self, data):
        user = data['user']
        title = data['title']
        page = data['page']

        report = BookReport.objects.get(author=user.pk, book=Book.objects.get(title=title))
        book = Book.objects.get(title=data['title'])

        if report.page < page:
            report.page = page
            report.save()

        paragraph = kss.split_sentences(book.contents)
        contents = paragraph[(page-1) * LINES : page * LINES]
        return {f"page {page}": contents}
