from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from bazar.models import UserProfile
from bazar.serializers import (UserProfileSerializer,
                               UserRUDSerializer,
                               UserRegistrationSerializer,
                               UserAuthSerializer
                               )
from rest_framework import generics
from bazar.models.post import Post
from rest_framework_simplejwt.tokens import RefreshToken


class UserListView(generics.ListAPIView):
    '''User List'''

    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all().order_by('-id')


class UserRegistrationView(generics.CreateAPIView):
    ''' User Create'''

    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    


class UserAuthView(APIView):
    serializer_class = UserAuthSerializer

    def post(self, request):
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    ''' User Detail'''

    serializer_class = UserRUDSerializer
    queryset = UserProfile.objects.all().order_by('-date_joined')


class BlacklistTokenView(APIView):

    def post(self, request):
        try:
            token = RefreshToken(request.data['refresh_token'])
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)