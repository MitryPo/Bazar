from bazar.views.account import BlacklistTokenView
from django.urls import path, re_path
from bazar.views import (CityListView, UserListView, UserRegistrationView,
                         UserDetailView, UserAuthView, BlacklistTokenView,
                         PostCreateView, PostListView, PostDetailView,PostCRUDView,
                         CategoryListView, CategoryDetailView, apiOverview)


urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('city-list', CityListView.as_view()),
    path('user-list', UserListView.as_view()),
    path('product/all', PostListView.as_view()),
    path('category/all', CategoryListView.as_view()),

    path('product/create', PostCreateView.as_view()),
    path('registration', UserRegistrationView.as_view()),
    path('login', UserAuthView.as_view()),
    path('logout/blacklist/', BlacklistTokenView.as_view()),

    path('product/<str:slug>', PostDetailView.as_view()),
    path('my-product/<str:slug>', PostCRUDView.as_view()),
    path('category/<str:slug>', CategoryDetailView.as_view()),

    path('user/<int:pk>/', UserDetailView.as_view())
]
