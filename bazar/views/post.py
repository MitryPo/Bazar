from bazar.models import Post
from bazar.serializers import PostSerializer
from rest_framework import generics


class PostListView(generics.ListAPIView):
    '''
        Post List

    '''
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by('-id')