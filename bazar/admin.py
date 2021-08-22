from django.contrib import admin
from .models import City, UserProfile, Post, Category


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        ]


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        'username',
        'is_online',
        'phone',
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
        'description',
        'sold',
        'city'
    ]
