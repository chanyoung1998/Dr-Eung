from django.contrib import admin
from .models import Quiz

class QuizAdmin(admin.ModelAdmin):
    list_display = ['content', 'quiz_number', 'question']
    search_fields = ['content']
    ordering = ['content', 'quiz_number']

admin.site.register(Quiz, QuizAdmin)
