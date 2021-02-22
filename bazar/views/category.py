from bazar.models import Category
from bazar.serializers import CategorySerializer
from rest_framework import generics


class CategoryListView(generics.ListAPIView):
    '''
        Category List

    '''
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('id')