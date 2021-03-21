from bazar.models import UserProfile
from bazar.serializers import UserProfileSerializer, PostListSerializer
from rest_framework import generics
from bazar.models.post import Post


class UserListView(generics.ListAPIView):
    '''User List'''

    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all().order_by('-id')