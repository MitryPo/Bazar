from bazar.models import Post, category
from bazar.serializers import PostListSerializer, PostCRUDSerializer

from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend


class PostListView(generics.ListAPIView):
    '''Post List'''

    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('category',)
    serializer_class = PostListSerializer
    queryset = Post.objects.all().order_by('-id')


class PostCreateView(generics.CreateAPIView):
    '''Create Post'''

    serializer_class = PostCRUDSerializer


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    '''Post Update/Delete & Detail View'''

    serializer_class = PostListSerializer
    queryset = Post.objects.all()
