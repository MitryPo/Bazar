from django.urls import path
from bazar.views import (CityListView, UserListView,
                         PostCreateView, PostListView, PostDetailView, 
                         CategoryListView, CategoryDetailView, apiOverview)


urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('city-list', CityListView.as_view()),
    path('user-list', UserListView.as_view()),
    path('product-list/', PostListView.as_view()),
    path('category-list', CategoryListView.as_view()),
    
    path('product-create', PostCreateView.as_view()),
    path('product/<int:pk>/', PostDetailView.as_view()),
    path('category/<int:pk>/', CategoryDetailView.as_view()),

    path('user/<int:pk>/', UserListView.as_view())
]
