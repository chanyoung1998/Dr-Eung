from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'nickname']
    search_fields = ['nickname']
    ordering = ['-nickname']

admin.site.register(User, UserAdmin)
