#import view as view
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
#from .service import  JobAndLoc
from .views import JobRoleViewSet,JobLocationViewSet,RegisterAPI,EmployeeViewSet,SkillViewSet,RegisterSkill,UserRemoveView,RemoveSkill
from . import views
router= routers.DefaultRouter()
router.register('getJobLoc', JobLocationViewSet)
router.register('getJobRole', JobRoleViewSet)
router.register('getUserList', EmployeeViewSet)
router.register('getSkillSet', SkillViewSet)



urlpatterns = [

    path('', include(router.urls)),
    path('register/', RegisterAPI.as_view()),
    path('addSkill/', RegisterSkill.as_view()),
    path('removeUser/', UserRemoveView.as_view()),
    path('removeSkill/', RemoveSkill.as_view()),

    
   
]