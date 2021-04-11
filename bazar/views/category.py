from bazar.models import Category
from bazar.serializers import CategorySerializer
from rest_framework import generics


class CategoryListView(generics.ListAPIView):
    '''Category List'''
    
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('id')


class CategoryDetailView(generics.RetrieveAPIView):
    '''Category Detail View'''
    
    serializer_class = CategorySerializer
    lookup_field='slug'
    queryset = Category.objects.all().order_by('id')