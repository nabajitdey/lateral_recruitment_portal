from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterApplicant,ApplicantViewSet,VaccancyViewSet,IndividualVaccancyViewSet,ApplicantInterviewViewSet,IndividualVaccancyViewSet,ApplicantSelectViewSet, InterviewLevelsViewSet,RegisterIntvComplete,RegisterIntvHistory, ApplicantRemoveView, IntvHistryViewSet,HistApplicantViewSet
from . import views

router= routers.DefaultRouter()
router.register('getVacancyList', VaccancyViewSet)
router.register('getIntvLvl', InterviewLevelsViewSet)
router.register('getApplicantList', ApplicantViewSet)

urlpatterns = [

    path('', include(router.urls)),
    path('register/', RegisterApplicant.as_view()),
    path('getApplicantInterviewList/', ApplicantInterviewViewSet.as_view()),
    path('getIndividualVacancyList/', IndividualVaccancyViewSet.as_view()),
    path('selectApplicantViewSetList/', ApplicantSelectViewSet.as_view()),
    path('registerHistory/', RegisterIntvHistory.as_view()),
    path('registerComplete/', RegisterIntvComplete.as_view()),
    path('removeApplicant/', ApplicantRemoveView.as_view()),
    path('getHistory/', IntvHistryViewSet.as_view()),
    path('getAppInHistory/', HistApplicantViewSet.as_view()),
    
    
   
]