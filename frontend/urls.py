from django.urls import path
from . import views


urlpatterns = [
    path('', views.index ),
    path('product/create', views.index),
    path('product/<str:slug>', views.index),
    path('my-product/<str:slug>', views.index),
    path('category/<str:slug>', views.index),
    path('login', views.index),
    path('logout', views.index),
    path('registration', views.index),
]