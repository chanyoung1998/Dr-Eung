from django.contrib import admin
from .models import Quiz

class QuizAdmin(admin.ModelAdmin):
    list_display = ['book', 'question', 'type']
    search_fields = ['book']
    ordering = ['book']

admin.site.register(Quiz, QuizAdmin)
