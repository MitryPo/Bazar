from bazar.models import UserProfile
from bazar.serializers import UserProfileSerializer
from rest_framework import generics, serializers


class UserListView(generics.ListAPIView):
    '''
        User List

    '''
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all().order_by('-id')