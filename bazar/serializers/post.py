from bazar.models import Post
from rest_framework import serializers


class PostListSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field='name', read_only=True)
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)
    creator = serializers.SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        model = Post
        exclude = ['id', ]


class PostCreateSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Post
        exclude = ['id', 'slug']
        read_only_fields = ['date_created', 'sold']

class PostEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        exclude = ['slug', 'date_created', 'id']
        read_only_fields = ['creator',]
