from django.contrib import admin
from .models import Book

class BookAdmin(admin.ModelAdmin):
    list_display = ['Title', 'Author', 'Genre']
    search_fields = ['Title', 'Author', 'Genre']
    ordering = ['-Title']

admin.site.register(Book, BookAdmin)
