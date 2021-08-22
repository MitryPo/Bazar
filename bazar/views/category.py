from bazar.models import Category
from bazar.serializers import CategorySerializer
from rest_framework import generics


class CategoryList(generics.ListAPIView):
    '''Category List'''

    serializer_class = CategorySerializer
    lookup_field = 'slug'
    queryset = Category.objects.all().filter(parent=None)


class SubCategoryList(generics.ListAPIView):
    '''Category List'''

    serializer_class = CategorySerializer
    lookup_field = 'slug'
    queryset = Category.objects.all().exclude(parent=None)


class CategoryDetail(generics.RetrieveAPIView):
    '''Category Detail View'''

    serializer_class = CategorySerializer
    lookup_field = 'slug'
    queryset = Category.objects.all()
