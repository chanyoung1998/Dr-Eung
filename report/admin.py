from django.contrib import admin
from .models import Text, BookReport

class TextAdmin(admin.ModelAdmin):
    list_display = ['TextID']

class BookReportAdmin(admin.ModelAdmin):
    list_display = ['UserID', 'BookID', 'Step', 'Format', 'Page', 'Complete', 'Time']
    search_fields = ['UserID', 'BookID']
    list_filter = ['Time', 'Step', 'Page', 'Complete']
    ordering = ['Time']

admin.site.register(Text, TextAdmin)
admin.site.register(BookReport, BookReportAdmin)
