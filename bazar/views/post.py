from bazar.models import Post
from .permissions import UserPermission
from bazar import serializers
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter


class PostList(generics.ListAPIView):
    '''Post List'''

    filter_backends = [DjangoFilterBackend]
    serializer_class = serializers.PostListSerializer
    filterset_fields = ['category__slug']
    queryset = Post.objects.all().order_by('-date_created')


class MyPostList(generics.ListAPIView):
    permission_classes = UserPermission
    serializer_class = serializers.PostListSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        return Post.objects.filter(creator=self.request.user.id)


class SearchPosts(generics.ListAPIView):
    serializer_class = serializers.PostListSerializer
    filter_backends = [SearchFilter,]
    search_fields = ['$title']
    queryset = Post.objects.all().order_by('-date_created')


class PostCreate(generics.CreateAPIView):
    '''Create Post'''

    permission_classes = [IsAuthenticated]
    serializer_class = serializers.PostCreateSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    '''Post Update/Delete & Detail View'''

    serializer_class = serializers.PostEditSerializer
    permission_classes = [UserPermission,]
    lookup_field='slug'
    queryset = Post.objects.all()

