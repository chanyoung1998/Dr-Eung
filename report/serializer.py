from rest_framework import serializers
from .models import BookReport

class BookReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReport
        fields = '__all__'
