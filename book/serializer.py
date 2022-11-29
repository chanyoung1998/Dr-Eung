from rest_framework import serializers
from rest_framework.generics import get_object_or_404
from django.core.exceptions import ValidationError
from django.http import Http404
from report.models import BookReport
from .apps import BookConfig
from .signals import LINES, LETTERS
from .models import *

class BookListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ('title', 'author', 'genre', 'description')


class BookSearchSerializer(serializers.Serializer):
    def to_internal_value(self, data):
        title = data
        book = get_object_or_404(Book, title=title)

        return {
            "title": book.title,
            "author": book.author,
            "genre": book.genre,
            "total_chapters": book.chapters,
            "description": book.description,
        }

class BookSerializer(serializers.BaseSerializer):
    def to_internal_value(self, data):
        user = data['user']
        title = data['title']
        page = int(data['page'])
        chapter = data['chapter']

        book = get_object_or_404(Book, title=title)

        if page == 0:
            chapter -= 1
            content_chapter = get_object_or_404(Content, chapter=chapter, book__title=title)
            page = content_chapter.pages
        else:
            try:
                content_chapter = book.content.get(chapter=chapter)
            except Content.DoesNotExist:
                return {"status": 404, 
                        "max_chapters": book.chapters}

        if not book.report.filter(author=user.pk):
            BookReport.objects.create(author=user, book=book)
        report = book.report.get(author=user.pk)
        report.bookmark = True

        if report.step == 3:
            report.step = 1
            report.page = 1
            if report.curr_chapter < chapter:
                report.curr_chapter = chapter
            report.save()

        if report.curr_chapter == chapter and report.page < page:
            report.page = page
            report.save()

        contents = content_chapter.content[(page - 1) * LETTERS: page * LETTERS]

        if len(book.keywords) < chapter * 3:
            keyword = BookConfig.models["keyword_extractor"].extract_keyword(content_chapter.content, 3)
            for k in keyword:
                book.keywords.append(k)
            book.save()

        return {"page": contents,
                "pages": content_chapter.pages,
                "chapters": book.chapters,
                "status": 200}

class HighlightIndexSerializer(serializers.Serializer):

    def to_internal_value(self, data):
        title = data['title']
        page = int(data['page'])
        chapter = data['chapter']

        book = Book.objects.get(title=title)
        chapter = book.content.get(chapter=chapter)
        contents = chapter.content[(page - 1) * LETTERS: page * LETTERS].split(".")
        summary_index = BookConfig.models["summerizer"].extractive_summarization(contents, 3)

        return {"index": summary_index}
