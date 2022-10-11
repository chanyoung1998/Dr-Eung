from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'Nickname', 'Ability']
    search_fields = ['Nickname']
    ordering = ['-Nickname']

admin.site.register(User, UserAdmin)
