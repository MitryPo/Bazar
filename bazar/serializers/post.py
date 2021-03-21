from ..models import Post
from rest_framework import serializers
from django.db.models.fields import DateTimeField


class PostListSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field='name', read_only=True)
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)
    date_created = DateTimeField()
    class Meta:
        model = Post
        fields = '__all__'


class PostCRUDSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = '__all__'