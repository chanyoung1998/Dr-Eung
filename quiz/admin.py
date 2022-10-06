from django.contrib import admin
from .models import Quiz

class QuizAdmin(admin.ModelAdmin):
    list_display = ['BookID', 'Question']
    search_fields = ['BookID']
    ordering = ['BookID']

admin.site.register(Quiz, QuizAdmin)
