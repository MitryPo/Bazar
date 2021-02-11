from django.urls import path

from bazar.views import CityListView, UserListView, PostListView, apiOverview


urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('city-list/', CityListView.as_view()),
    path('account-list/', UserListView.as_view()),
    path('post-list/', PostListView.as_view()),
]
