from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

from .models import User

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
        fields = ('username', 'password', 'password2', 'nickname', 'name', 'school', 'introduction')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError(
                {"password":"Password fields didn't match."})
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            nickname=validated_data['nickname'],
            name=validated_data['name'],
            school=validated_data['school'],
            introduction=validated_data['introduction']
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

    def to_representation(self, obj):
        user = obj
        score = {
            "어휘력": user.ability[0],
            "문법": user.ability[1],
            "응집성": user.ability[2],
            "이해력": user.ability[3],
            "유창성": user.ability[4],
        }

        reports = user.report.all().values().order_by('-time')[:5]
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

        if not recent:
            recent = "아직 읽은 책이 없어요"

        return {
            "nickname": user.nickname,
            "ability": score,
            "recent": recent
        }
