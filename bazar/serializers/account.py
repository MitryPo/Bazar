from bazar.models import UserProfile
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'username',
            'is_online',
            'phone',
            'date_joined',
        ]


class UserRegisterSerializer(serializers.ModelSerializer):
    phone = serializers.CharField()
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )
    token = serializers.CharField(max_length=256, read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'phone',
            'password',
            'token'
        ]
        read_only_fields = ['token',]

    def create(self, validated_data):
        return UserProfile.objects.create_user(**validated_data)


class UserAuthSerializer(serializers.Serializer):
    phone = serializers.CharField(min_length=16)
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )
    token = serializers.CharField(max_length=256, read_only=True)

    def validate(self, validated_data):
        phone = validated_data.get('phone', None)
        password = validated_data.get('password', None)
        user = authenticate(username=phone, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )
        return {
            'phone': user.phone,
            'token': user.token
        }


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'username',
            'phone',
            'date_joined',
        ]
        read_only_fields = ['date_joined',]
