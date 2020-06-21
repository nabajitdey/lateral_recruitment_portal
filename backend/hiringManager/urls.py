from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterVacancy,VaccancyViewSet,VacancyRemoveView,IndvVacancyRemoveView,HireApplicant
from . import views



urlpatterns = [

    # path('', include(router.urls)),
    path('register/', RegisterVacancy.as_view()),
    path('getVacancyList/', VaccancyViewSet.as_view()),
    path('vacancyRemove/', VacancyRemoveView.as_view()),
    path('indVacRemove/', IndvVacancyRemoveView.as_view()),
     path('hireApplicant/', HireApplicant.as_view()),
    
   
]