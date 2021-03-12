from django.urls import path
from bazar.views import (CityListView, UserListView,
                         PostCreateView, PostListView, PostDetailView, 
                         CategoryListView, apiOverview)


urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('city-list/', CityListView.as_view()),
    path('user-list/', UserListView.as_view()),
    path('post-list/', PostListView.as_view()),
    path('category-list/', CategoryListView.as_view()),
    
    path('create-post/', PostCreateView.as_view()),
    path('post/<int:pk>/', PostDetailView.as_view())
]
