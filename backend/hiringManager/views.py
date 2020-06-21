
from rest_framework import viewsets, generics
from .models import MasterVacancy,IndividualVacancies,MasterSkill
from .serializers import PostVaccancySerializer,VaccancySerializer,IndividualVaccancySerializer,ApplicantSerializer,InterviewHistorySerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from adminManager.models import MasterEmployee
from django.core.serializers import serialize
from django.utils.functional import Promise
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.encoding import force_text
from django.core import serializers
from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.forms.models import model_to_dict
from talentManager.models import MasterApplicant,InterviewHistory

class ApplicantViewSet(generics.ListCreateAPIView):
    serializer_class=ApplicantSerializer
    
    def post(self, request, *args, **kwargs):
        vacancy=IndividualVacancies.objects.get(id=request.data["vacId"]).pk
        queryset = MasterApplicant.objects.filter(individual_vacancy=vacancy, is_active=True)
        serializer = ApplicantSerializer(queryset, many=True)
        return Response(serializer.data)


class IndividualVaccancyViewSet(generics.ListCreateAPIView):
    serializer_class=IndividualVaccancySerializer
    
    def post(self, request, *args, **kwargs):
        vacancy=MasterVacancy.objects.get(id=request.data["vacId"]).pk
        queryset = IndividualVacancies.objects.filter(master_vacancy=vacancy, is_active=True)
        serializer = IndividualVaccancySerializer(queryset, many=True)
        return Response(serializer.data)

       # invac=IndividualVacancies.objects.get(master_vacancy=vacancy)
        # return Response({
        #     'invac': IndividualVaccancySerializer(invac, context=self.get_serializer_context()).data
        # })

class VaccancyViewSet(generics.ListCreateAPIView):
    serializer_class = VaccancySerializer

    def post(self, request, *args, **kwargs):
        print("user.emp_name")
        user=MasterEmployee.objects.get(id=request.data["userId"]).pk
        print("user.emp_name")
        queryset = MasterVacancy.objects.filter(hiringManager=user, is_active=True)
        # return queryset
        serializer = VaccancySerializer(queryset, many=True)
        return Response(serializer.data)

class VaccancyIntvHistryViewSet(generics.ListCreateAPIView):
    serializer_class = VaccancySerializer

    def post(self, request, *args, **kwargs):
        print("user.emp_name")
        user=MasterEmployee.objects.get(id=request.data["userId"]).pk
        print("user.emp_name")
        queryset = MasterVacancy.objects.filter(hiringManager=user, status ="Ongoing", is_active=True)
        # return queryset
        serializer = VaccancySerializer(queryset, many=True)
        return Response(serializer.data)

class IndvVaccancyIntvHistryViewSet(generics.ListCreateAPIView):
    serializer_class = IndividualVaccancySerializer

    def post(self, request, *args, **kwargs):
        print("user.emp_name")
        vacancy=MasterVacancy.objects.get(id=request.data["vacId"]).pk
        queryset = IndividualVacancies.objects.filter(master_vacancy=vacancy, status ="Ongoing", is_active=True)
        # return queryset
        serializer = IndividualVaccancySerializer(queryset, many=True)
        return Response(serializer.data)       
        

class RegisterVacancy(generics.GenericAPIView):
  serializer_class = PostVaccancySerializer
  def post(self, request, *args, **kwargs):
    print("post1")
    serializer = self.get_serializer(data=request.data)
    print("post1")
    serializer.is_valid()
    print("post1")
    vacancy= serializer.save()
    return Response({
      'vacancy':PostVaccancySerializer(vacancy, context=self.get_serializer_context()).data
      })
    
class HireApplicant(generics.GenericAPIView):
  serializer_class = ApplicantSerializer
  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    applicant=MasterApplicant.objects.get(id=request.data["id"])
    print(applicant.app_name)
    if applicant.complete_status != "Completed" or applicant.result == "Failed":
      return Response({
      'success':False,
      'message':"Failed"
      })
    else :
      applicant.hire_status= "Hired"
      applicant.save()
    return Response({
     'success':True,
     'message':"Applicant hired"
      })



class IntvHistryViewSet(generics.ListCreateAPIView):
    serializer_class = InterviewHistorySerializer

    def post(self, request, *args, **kwargs):
        applicant=MasterApplicant.objects.get(id=request.data["id"]).pk
        queryset = InterviewHistory.objects.filter(applicant=applicant)
        # return queryset
        serializer = InterviewHistorySerializer(queryset, many=True)
        return Response(serializer.data) 



class VacancyRemoveView(generics.ListCreateAPIView):
    serializer_class = VaccancySerializer

    def post(self,request, *args, **kwargs):
        print("user.emp_name")
        print("user.emp_name")
        vacancy=MasterVacancy.objects.get(id=request.data["id"])
        vacancy.is_active=False
        vacancy.save()
        
        indv_vacs= IndividualVacancies.objects.filter(master_vacancy=vacancy, is_active=True)
        if indv_vacs:
          for i in indv_vacs:
            i.is_active=False
            i.save()
            applicants=MasterApplicant.objects.filter(individual_vacancy=i, is_active=True)
            if applicants:
              for a in applicants:
                if a.complete_status != "Complete":
                  a.individual_vacancy = None
                  a.master_vacancy = None
                  a.current_level="0"
                  a.result=""
                  a.complete_status="Not yet started"
                  a.save()

       
        return Response({
            'delete':"deleted"
        })



class IndvVacancyRemoveView(generics.ListCreateAPIView):
    serializer_class = IndividualVaccancySerializer

    def post(self,request, *args, **kwargs):
        
        vacancy=IndividualVacancies.objects.get(id=request.data["id"])
        vacancy.is_active=False
        vacancy.save()
        
        applicants=MasterApplicant.objects.filter(individual_vacancy=vacancy, is_active=True)
        if applicants:
          for a in applicants:
            if a.complete_status != "Complete":
              a.individual_vacancy = None
              a.master_vacancy = None
              a.current_level="0"
              a.result=""
              a.complete_status="Not yet started"
              a.save()

    
        return Response({
            'delete':"deleted"
        })
