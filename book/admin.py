from django.contrib import admin
from .models import Book, Content

class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'genre']
    search_fields = ['title', 'author', 'genre']
    ordering = ['-title']

admin.site.register(Book, BookAdmin)
admin.site.register(Content)
