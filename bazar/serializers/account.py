from bazar.models import UserProfile
from rest_framework import serializers

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'username',
            'is_online',
            'balance',
            'phone',
            ]