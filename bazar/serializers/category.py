from ..models import Category
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.SlugRelatedField(slug_field='name', read_only=True)
    class Meta:
        model = Category
        fields = '__all__'
