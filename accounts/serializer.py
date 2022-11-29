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
            "이해력": user.ability[0],
            "맞춤법": user.ability[1],
            "표현": user.ability[2],
            "구성": user.ability[3],
            "내용": user.ability[4],
        }

        n = sum(user.genres)
        genre_score = {
            "소설": int((user.genres[0] / n) * 100),
            "수필": int((user.genres[1] / n) * 100),
            "희곡": int((user.genres[2] / n) * 100),
            "전기": int((user.genres[3] / n) * 100),
            "비문학": int((user.genres[4] / n) * 100),
        }

        reports = user.report.all().values().order_by('-time')[:5]
        recent = []
        for report in reports:
            recent.append(
                {
                    "id": report['book_id'],
                    "date": report['time'].strftime('%Y-%m-%d'),
                    "time": report['time'].strftime('%H:%M'),
                    "info": {
                        "state": report.step,
                        "current_page": report.page,
                        "current_chapter": report.curr_capter,
                        "format": reports.format
                    }
                }
            )
            if report['complete']:
                recent[-1].update({"state": "감상문 작성 완료"})
            else:
                if report['step'] == 1:
                    recent[-1].update({"state": f"{report['curr_chapter']}단원 {report['page']}p 읽는중"})
                elif report['step'] == 2:
                    recent[-1].update({"state": f"{report['curr_chapter']}단원 퀴즈 푸는중"})
                elif report['step'] == 3:
                    recent[-1].update({"state": f"{report['curr_chapter']}단원 활동 중"})
                elif report['step'] == 4:
                    recent[-1].update({"state": "감상문 작성 중"})

        return {
            "profile": {
                "name": user.name,
                "nickname": user.nickname,
                "school": user.school,
                "introduction": user.introduction,
            },
            "score": {
                "ability": score,
                "genres": genre_score,
            },
            "activities": {
                "recent": recent
            },
            "tier": user.tier
        }
