from abc import ABC

from rest_framework import serializers
from report.models import BookReport
from .apps import BookConfig
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
        page = int(data['page'])
        chapter = data['chapter']

        if not Book.objects.filter(title=title):
            return -1
        book = Book.objects.get(title=title)

        if not book.content.filter(chapter=chapter):
            return -1
        content_chapter = book.content.get(chapter=chapter)

        if not book.report.filter(author=user.pk):
            BookReport.objects.create(author=user, book=book)
        report = book.report.get(author=user.pk)

        if report.page < page:
            report.page = page
            report.save()

        contents = content_chapter.content_lines[(page - 1) * LINES:page * LINES]

        if len(book.keywords) < chapter * 3:
            keyword = BookConfig.models["keyword_extractor"].extract_keyword(content_chapter.content, 3)
            for k in keyword:
                book.keywords.append(k)
            book.save()

        return {"page": contents,
                "pages": content_chapter.pages,
                "chapters": book.chapters}


class HighlightIndexSerializer(serializers.Serializer):

    def to_internal_value(self, data):
        title = data['title']
        page = int(data['page'])
        chapter = data['chapter']

        book = Book.objects.get(title=title)
        chapter = book.content.get(chapter=chapter)
        contents = chapter.content_lines[(page - 1) * LINES:page * LINES]
        summary_index = BookConfig.models["summerizer"].extractive_summarization(contents, 3)
        index = [(page - 1) * LINES + i for i in summary_index]

        return {"index": index}
