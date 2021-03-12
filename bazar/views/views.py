from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render



@api_view(['get'])
def apiOverview(request):
    api_urls = {
        'City list': '/city-list',
        'Account list': '/user-list',
        'Post list': '/post-list',

        'Create account': 'account-create',
        'Update account': 'account-update/<str:pk>',
        'Delete account': 'account-delete/<str:pk>',

        'Create product post': '/create-post',
        'Update product post': '/update-post/<str:pk>',
        'Delete product post': '/delete-post/<str:pk>'

    }
    return Response(api_urls)


@api_view(['get'])
def webIndex(request, *args, **kwargs):
    return render(request, 'index.html')
