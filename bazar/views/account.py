from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics
from bazar.models import UserProfile
from bazar import serializers
from rest_framework_simplejwt.tokens import RefreshToken


class UserList(generics.ListAPIView):
    '''User List'''

    serializer_class = serializers.UserProfileSerializer
    queryset = UserProfile.objects.all().order_by('-id')


class UserRegister(generics.CreateAPIView):
    ''' User Create'''

    permission_classes = [permissions.AllowAny,]
    serializer_class = serializers.UserRegisterSerializer


class UserView(generics.RetrieveAPIView):
    '''User View'''

    serializer_class = serializers.UserDetailSerializer
    queryset = UserProfile.objects.all()


class UserAccount(generics.GenericAPIView):
    serializer_class = serializers.UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        user = UserProfile.objects.get(pk=self.request.user.id)
        serializer = serializers.UserDetailSerializer(user)
        if user:
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def patch(self, request):
        user = UserProfile.objects.get(pk=self.request.user.id)
        serializer = serializers.UserDetailSerializer(user, data=request.data)
        if user and serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = UserProfile.objects.get(pk=self.request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserAuth(APIView):
    serializer_class = serializers.UserAuthSerializer

    def post(self, request):
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class BlacklistTokenView(APIView):
    def post(self, request):
        try:
            token = RefreshToken(request.data['refresh_token'])
            token.blacklist()
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
