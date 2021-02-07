from django.urls import path

from bazar.views import CityListView, UserListView, apiOverview


urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('city-list/', CityListView.as_view()),
    path('account-list/', UserListView.as_view())
]
