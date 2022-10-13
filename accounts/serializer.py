from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

from .models import User, Ability
from report.models import BookReport

class RegisterSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'},
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'nickname')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError(
                {"password":"Password fields didn't match."})
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            nickname=validated_data['nickname']
        )
        user.set_password(validated_data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        user = authenticate(**data)
        if user:
            token = Token.objects.get(user=user)
            return token
        raise serializers.ValidationError(
            {"error": "Unable to log in with provided credentials."})

class ProfileSerializer(serializers.BaseSerializer):
    """
    UserDB에서 현재 로그인한 유저의 정보를 받아와서 유저 정보를 전송
    BookReportDB에서 현재 유저가 작성한 감상문을 받아와 가장 최근에 작성된 3개만 전송, 작성된게 없으면 빈 리스트를 전송
    """

    def to_representation(self, obj):
        user = obj

        ability = Ability.objects.get(user=user)
        score = {
            "어휘력": ability.vocabulary_score,
            "문법": ability.grammar_score,
            "응집성": ability.coherence_score,
            "이해력": ability.comprehension_score,
            "유창성": ability.fluency_score,
        }

        reports = BookReport.objects.filter(author=user).values().order_by('-time')[:3]
        recent = []
        for report in reports:
            if report['complete']:
                recent.append((report['time'].strftime('%Y-%m-%d %H:%M'), f"[{report['book_id']}] 감상문 작성 완료"))
            else:
                if report['step'] == 1:
                    recent.append((report['time'].strftime('%Y-%m-%d %H:%M'), f"[{report['book_id']}] {report['page']}p 읽는중"))
                elif report['step'] == 2:
                    recent.append((report['time'].strftime('%Y-%m-%d %H:%M'), f"[{report['book_id']}] 퀴즈 푸는중"))
                elif report['step'] == 3:
                    recent.append((report['time'].strftime('%Y-%m-%d %H:%M'), f"[{report['book_id']}] 감상문 작성중"))

        return {
            "nickname": user.nickname,
            "ability": score,
            "recent": recent
        }