from bazar.models import category
from ..models import Post
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field='name', read_only=True)
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)
    class Meta:
        model = Post
        fields = '__all__'