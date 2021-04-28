from django.contrib.auth.models import User
from bazar.models import Post
from bazar.models.account import UserProfile
from bazar.serializers import PostListSerializer, PostCRUDSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter


class PostListView(generics.ListAPIView):
    '''Post List'''

    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ['city','category']
    search_fields = ['$title',]
    serializer_class = PostListSerializer
    queryset = Post.objects.all().order_by('-date_created')


class PostCreateView(generics.CreateAPIView):
    '''Create Post'''

    serializer_class = PostCRUDSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    

class PostCRUDView(generics.RetrieveUpdateDestroyAPIView):
    '''Post Update/Delete & Detail View (authenticated only)'''

    serializer_class = PostCRUDSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field='slug'
    queryset = Post.objects.all().order_by('-date_created')


class PostDetailView(generics.RetrieveAPIView):
    '''Post Detail View'''

    serializer_class = PostListSerializer
    lookup_field='slug'
    queryset = Post.objects.all().order_by('-date_created')

