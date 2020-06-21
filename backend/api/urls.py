
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import EmployeeViewSet,CustomAuthToken, LoginAPI
from rest_framework.authtoken.views import obtain_auth_token

router= routers.DefaultRouter()
router.register('users', EmployeeViewSet)
#router.register('login', LoginAPI.as_view())
#router.register('home', CustomAuthToken.as_view())

urlpatterns = [
    path('', include(router.urls) ),
    path('login/', LoginAPI.as_view())
    #path('home/', CustomAuthToken.as_view())
]
