from rest_framework import serializers
from .models import BookReport

class ReportListSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        user = obj
        reports = BookReport.objects.filter(author=user).order_by('-time').values()

        result = {}
        for i, report in enumerate(reports):
            result[str(i+1)] = {
                "책 제목": report['book_id'],
                "작성완료": report['complete'],
                "즐겨찾기": report['bookmark']
            }

        return result

class BookReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReport
        fields = '__all__'