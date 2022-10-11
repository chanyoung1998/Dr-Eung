from rest_framework import serializers


class ProfileSeializer(serializers.Serializer):
"""
    UserDB에서 현재 로그인한 유저의 정보를 받아와서 유저 정보를 전송
    BookReportDB에서 현재 유저가 작성한 감상문을 받아와 가장 최근에 작성된 3개만 전송, 작성된게 없으면 None을 전송
"""
    class Meta:
        # fields = ('User.Nickname', User.Ability.all(), BookReport(user).Time, BookReport(user).book.Title)

