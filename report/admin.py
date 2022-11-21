from django.contrib import admin
from .models import Text, BookReport, Activity

class TextAdmin(admin.ModelAdmin):
    list_display = ['report']

class BookReportAdmin(admin.ModelAdmin):
    list_display = ['author', 'book', 'step', 'format', 'page', 'complete', 'time']
    search_fields = ['author', 'book']
    list_filter = ['time', 'step', 'page', 'complete']
    ordering = ['time']

class ActivityAdmin(admin.ModelAdmin):
    list_display = ['text','chapter']

admin.site.register(Text, TextAdmin)
admin.site.register(BookReport, BookReportAdmin)
admin.site.register(Activity, ActivityAdmin)
