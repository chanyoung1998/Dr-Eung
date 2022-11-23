from rest_framework import serializers
from rest_framework.generics import get_object_or_404
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
            content_chapter = get_object_or_404(Content, chapter=chapter, book__title=title)

        if not book.report.filter(author=user.pk):
            BookReport.objects.create(author=user, book=book)
        report = book.report.get(author=user.pk)
        report.bookmark = True

        if report.step == 2:
            report.step = 1
            report.page = 1
            if report.curr_chapter < chapter:
                report.curr_chapter = chapter
            report.save()

        if report.curr_chapter == chapter and report.page < page:
            report.page = page
            report.save()

        # contents = content_chapter.content_lines[(page - 1) * LINES:page * LINES]
        contents = content_chapter.content[(page - 1) * LETTERS: page * LETTERS]

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
