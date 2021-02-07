from django.contrib import admin
from django.contrib.auth.models import User
from .models import City, UserProfile, Post, Category
from django.contrib.auth.admin import UserAdmin

# Register your models here.

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        'username',
        'is_online',
        'balance',
        'phone'
    ]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name',
    ]


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = [
        'image_tag',
        'title',
        'price',
    ]
