from django.urls import path
from . import views


urlpatterns = [
    path('', views.index ),
    path('create-post', views.index),
    path('post/<int:pk>/', views.index)
]