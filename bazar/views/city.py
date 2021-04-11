from bazar.models import City
from bazar.serializers import CitySerializer
from rest_framework import generics


class CityListView(generics.ListAPIView):
    '''City List'''
    
    serializer_class = CitySerializer
    lookup_field='slug'
    queryset = City.objects.all().order_by('id')