import rest_framework
from bazar import serializers
from bazar.models import City, UserProfile
from bazar.serializers import CitySerializer, UserProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['get'])
def apiOverview(request):
    api_urls = {
        'City list': '/city-list',
        'Account list': '/account-list',

        'Create account': 'account-create',
        'Update account': 'account-update/<str:pk>',
        'Delete account': 'account-delete/<str:pk>',

        'Create product post': '/sell-product',
        'Update product post': '/update-product/<str:pk>',
        'Delete product post': '/delete-product/<str:pk>'

    }
    return Response(api_urls)
