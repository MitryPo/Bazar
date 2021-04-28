from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.exceptions import NotFound


@api_view(['get'])
def apiOverview(request):
    api_urls = {
        'City list': '/city-list',
        'Account list': '/user-list',
        'Post list': '/product/all',

        'Create account': 'account/create',
        'Update account': 'account/update/<str:pk>',
        'Delete account': 'account/delete/<str:pk>',

        'Create product post': '/product/create/',
        'Update product post': '/product/update/<str:pk>',
        'Delete product post': '/product/delete/<str:pk>'

    }
    return Response(api_urls)


@api_view(['get'])
def webIndex(request, *args, **kwargs):
    return render(request, 'index.html')

# @api_view(['get'])
# def exception_handler(request, exception):
#     return render(request, '404.html')