from rest_framework import serializers
from .models import *

# class UserSerializer(serializers.Serializer):
#     UserID = serializers.BigIntegerField()
#     PassWord = serializers.CharField(max_length=255)
#     Nickname = serializers.CharField(max_length=45)
#     Ability = serializers.IntegerField()
#
#     def create(self, validated_data):
#         return User.objects.create(validated_data)
#
#     def update(self, instance, validated_data):
#         instance.UserID = validated_data.get('UserID', instance.UserID)
#         instance.PassWord = validated_data.get('PassWord', instance.Password)
#         instance.NickName = validated_data.get('NickName', instance.NickName)
#         instance.Ability = validated_data.get('Ability', instance.Ability)
#         instance.save()
#         return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
