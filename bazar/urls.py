from django.urls import path
from bazar import views


urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('city-list/', views.CityList.as_view()),
    path('user-list/', views.UserList.as_view()),
    path('product-list/', views.PostList.as_view()),
    path('category-list/', views.CategoryList.as_view()),
    path('subcategory-list/', views.SubCategoryList.as_view()),

    path('product/create', views.PostCreate.as_view()),
    path('registration/', views.UserRegister.as_view()),
    path('login/', views.UserAuth.as_view()),
    path('logout/blacklist/', views.BlacklistTokenView.as_view()),

    path('product/<str:slug>', views.PostDetail.as_view()),
    path('my-products/', views.MyPostList.as_view()),
    path('category/<str:slug>', views.CategoryDetail.as_view()),

    path('user/<int:pk>/', views.UserView.as_view()),
    path('account/', views.UserAccount.as_view())
]
