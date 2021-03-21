from django.urls import path
from . import views


urlpatterns = [
    path('', views.index ),
    path('product-create', views.index),
    path('product/<int:pk>', views.index),
    path('category/<int:pk>', views.index)
]