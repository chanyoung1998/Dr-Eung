from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ['UserID', 'Nickname', 'Ability']
    search_fields = ['Nickname']
    ordering = ['-Nickname']

class BookAdmin(admin.ModelAdmin):
    list_display = ['Title', 'Author', 'Genre']
    search_fields = ['Title', 'Author', 'Genre']
    ordering = ['-Title']

class TextAdmin(admin.ModelAdmin):
    list_display = ['TextID']

class QuizAdmin(admin.ModelAdmin):
    list_display = ['BookID', 'Question']
    search_fields = ['BookID']
    ordering = ['BookID']

class BookReportAdmin(admin.ModelAdmin):
    list_display = ['UserID', 'BookID', 'Step', 'Format', 'Page', 'Complete', 'Time']
    search_fields = ['UserID', 'BookID']
    list_filter = ['Time', 'Step', 'Page', 'Complete']
    ordering = ['Time']

admin.site.register(User, UserAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Text, TextAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(BookReport, BookReportAdmin)