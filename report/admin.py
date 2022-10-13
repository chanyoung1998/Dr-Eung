from django.contrib import admin
from .models import Text, BookReport

class TextAdmin(admin.ModelAdmin):
    list_display = ['textID']

class BookReportAdmin(admin.ModelAdmin):
    list_display = ['author', 'book', 'step', 'format', 'page', 'complete', 'time']
    search_fields = ['author', 'book']
    list_filter = ['time', 'step', 'page', 'complete']
    ordering = ['time']

admin.site.register(Text, TextAdmin)
admin.site.register(BookReport, BookReportAdmin)
