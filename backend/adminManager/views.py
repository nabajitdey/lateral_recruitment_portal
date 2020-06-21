from rest_framework import viewsets, generics
from .models import MasterEmployee,JobRole,JobLocation
from .serializers import JobRoleSerializer,JobLocationSerialzer,RegisterSerializer,EmployeeSerializer, SkillSetSerializer,RegisterSkillSerializer
#from ..api.serializers import  RegisterSerializer,EmployeeSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from hiringManager.models import MasterSkill, MasterVacancy,IndividualVacancies
from talentManager.models import MasterApplicant


class EmployeeViewSet (viewsets.ModelViewSet ):
    queryset = MasterEmployee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self): #this method is called inside of get
        queryset = self.queryset.filter(is_active=True)
        return queryset


# class EmployeeViewSet(generics.ListCreateAPIView):
#     serializer_class=EmployeeSerializer
    
#     def get(self, *args, **kwargs):
#         queryset = MasterEmployee.objects.filter(is_active=True)
#         serializer = EmployeeSerializer(queryset, many=True)
#         return Response(serializer.data)

class SkillViewSet(viewsets.ModelViewSet):
    queryset=MasterSkill.objects.all()
    serializer_class=SkillSetSerializer


class JobLocationViewSet (viewsets.ModelViewSet):
    queryset = JobLocation.objects.all()
    serializer_class = JobLocationSerialzer



class JobRoleViewSet (viewsets.ModelViewSet):
    queryset = JobRole.objects.all()
    serializer_class = JobRoleSerializer


class RegisterSkill(generics.GenericAPIView):
  serializer_class = RegisterSkillSerializer
  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    print(request.data["skill_name"])
    serializer.is_valid()
    skill= serializer.save()
    return Response({
      'skill':RegisterSkillSerializer(skill, context=self.get_serializer_context()).data
      })
    

class RemoveSkill(generics.GenericAPIView):
  serializer_class = RegisterSkillSerializer
  def post(self, request, *args, **kwargs):
    MasterSkill.objects.get(id=request.data["id"]).delete()
    return Response({
      'success':True
      })
      



class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid()
    user = serializer.save()
    token, created = Token.objects.get_or_create(user=user)
    return Response({
      "user": EmployeeSerializer(user, context=self.get_serializer_context()).data,
    })


class UserRemoveView(generics.ListCreateAPIView):
    serializer_class = EmployeeSerializer

    def post(self,request, *args, **kwargs):
        print("user.emp_name")
        print("user.emp_name")
        user=MasterEmployee.objects.get(id=request.data["id"])
        if user.is_superuser == True:
          return Response({
            'success':False,
            'message':"Cannot delete a superuser"
          })
        
        else:
          print(request.data["designation"])
          if request.data["designation"] == "Hiring Manager":  
            vacancies=MasterVacancy.objects.filter(hiringManager=user, is_active=True)
            if vacancies:
              for v in vacancies:
                v.is_active=False
                v.save()
                indv_vacs= IndividualVacancies.objects.filter(master_vacancy=v, is_active=True)
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
            if user.designation.all().count() > 1:
              desId=JobRole.objects.get(designation=request.data["designation"]).pk
              user.designation.remove(desId)
              user.save()
            else:
              user.is_active=False
              user.save()               
          else:
            if user.designation.all().count() > 1:
              desId=JobRole.objects.get(designation=request.data["designation"]).pk
              user.designation.remove(desId)
              user.save()
            else:
              user.is_active=False
              user.save() 
                
        return Response({
            'success':True,
            'message':"user deleted"
        })