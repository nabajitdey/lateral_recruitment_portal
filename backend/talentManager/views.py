from rest_framework import viewsets, generics
from .models import MasterApplicant, InterviewLevel,InterviewHistory
from .serializers import ApplicantRegistrationSerializer, ApplicantSerializer, IndividualVaccancySerializer, VaccancySerializer,InterviewLevelsSerializer,IntvHistoryUpdateSerializer,InterviewHistorySerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from hiringManager.models import MasterSkill, MasterVacancy, IndividualVacancies
import json
from django.http import JsonResponse

class InterviewLevelsViewSet(viewsets.ModelViewSet):
    serializer_class = InterviewLevelsSerializer
    queryset = InterviewLevel.objects.all()



class ApplicantSelectViewSet(generics.ListCreateAPIView):
    serializer_class=ApplicantSerializer
    
    def post(self, request, *args, **kwargs):
        vacancy=IndividualVacancies.objects.get(id=request.data["id"])
        applicants=MasterApplicant.objects.filter(is_active=True, complete_status="Not yet started")
        
        #checking starts
        count=0
        check1=False
        check2=False
        check3=False

        for applicant in applicants:

            if count >= request.data["count"] :
                break

            #skill check
            for vac_skill in vacancy.skills.all():

                skillCheck=False
                for app_skill in applicant.skills.all():
                    if app_skill == vac_skill : 
                        skillCheck=True

                if skillCheck == True: check1= True 
                else: check1= False

            #yrs_of_exp check
            if applicant.yrs_of_exp >= vacancy.yrs_of_exp: check2=True

            #location pref check
            if applicant.preffered_location.location == vacancy.vac_location.location : check3= True

            if check1==True and check2==True and check3==True:
                applicant.individual_vacancy = vacancy
                applicant.master_vacancy=vacancy.master_vacancy
                applicant.complete_status="Shortlisted"
                applicant.save()
                count= count+1

        master_vacancy=MasterVacancy.objects.get(id = vacancy.master_vacancy.id)
        master_vacancy.status="Ongoing"
        master_vacancy.save()
        vacancy.status="Ongoing"
        vacancy.save()


        queryset = MasterApplicant.objects.filter(individual_vacancy=vacancy)
        serializer = ApplicantSerializer(queryset, many=True)
        return Response(serializer.data)

class ApplicantInterviewViewSet(generics.ListCreateAPIView):
    serializer_class=ApplicantSerializer
    
    def post(self, request, *args, **kwargs):
        vacancy=IndividualVacancies.objects.get(id=request.data["vacId"]).pk
        queryset = MasterApplicant.objects.filter(individual_vacancy=vacancy, result="", is_active=True)
        serializer = ApplicantSerializer(queryset, many=True)
        return Response(serializer.data)


class IndividualVaccancyViewSet(generics.ListCreateAPIView):
    serializer_class=IndividualVaccancySerializer
    
    def post(self, request, *args, **kwargs):
        vacancy=MasterVacancy.objects.get(id=request.data["vacId"]).pk
        queryset = IndividualVacancies.objects.filter(master_vacancy=vacancy, is_active=True)
        serializer = IndividualVaccancySerializer(queryset, many=True)
        return Response(serializer.data)



class VaccancyViewSet(viewsets.ModelViewSet):
    serializer_class = VaccancySerializer
    queryset = MasterVacancy.objects.all()

    def get_queryset(self): #this method is called inside of get
        queryset = self.queryset.filter(is_active=True)
        return queryset


class ApplicantViewSet (viewsets.ModelViewSet):
    queryset = MasterApplicant.objects.all()
    serializer_class = ApplicantSerializer

    def get_queryset(self): #this method is called inside of get
        queryset = self.queryset.filter(is_active=True)
        return queryset

    # def post(self, request, *args, **kwargs):
    #     print("mc")
    #     #applicants=[]
    #     applicants = MasterApplicant.objects.filter(is_active=True)
    #     # i=0
    #     for x in applicants:
    #         print(x.preffered_location.id)

    #     #     applicants[i]=x
    #     #     i=i+1
    #     # for x in applicants:
    #     #     print(x.emp_name)    
    #     return Response({
    #         'applicants':{ ApplicantSerializer(applicants, context=self.get_serializer_context()).data}
    #     })
    #     # 'applicants': ApplicantSerializer(applicants, context=self.get_serializer_context()).data
    #     #     #json.dumps(applicants)
    #     # return JsonResponse(applicants, safe=False)


class RegisterApplicant(generics.GenericAPIView):
    serializer_class = ApplicantRegistrationSerializer

    def post(self, request, *args, **kwargs):
        print("post1")
        serializer = self.get_serializer(data=request.data)
        print("post1")
        serializer.is_valid()
        print("post1")
        applicant = serializer.save()
        return Response({
            'applicant': ApplicantRegistrationSerializer(applicant, context=self.get_serializer_context()).data
        })


class RegisterIntvHistory(generics.GenericAPIView):
    serializer_class = IntvHistoryUpdateSerializer

    def post(self, request, *args, **kwargs):
        print("post1")
        serializer = self.get_serializer(data=request.data)
        applicant=MasterApplicant.objects.get(id=request.data["applicant"])
        applicant.complete_status="Ongoing"
        applicant.current_level=request.data["interview_level"]
        applicant.save()
        print(request.data["interview_level"])
        serializer.is_valid()
        print("post1")
        history=serializer.save()


        return Response({
            'history': IntvHistoryUpdateSerializer(history, context=self.get_serializer_context()).data
        })

class RegisterIntvComplete(generics.GenericAPIView):
    serializer_class = IntvHistoryUpdateSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        applicant=MasterApplicant.objects.get(id=request.data["applicant"])
        applicant.complete_status="Completed"
        print("yo bro")
        applicant.result=request.data["result"]
        applicant.save()
        print(applicant.complete_status)

        return Response({
            'complete':"complete"
        })

class VaccancyIntvHistryViewSet(generics.ListCreateAPIView):
    serializer_class = VaccancySerializer

    def get(self, *args, **kwargs):
        print("user.emp_name")
        print("user.emp_name")
        queryset = MasterVacancy.objects.filter(status ="Ongoing", is_active=True)
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



class IntvHistryViewSet(generics.ListCreateAPIView):
    serializer_class = InterviewHistorySerializer

    def post(self, request, *args, **kwargs):
        applicant=MasterApplicant.objects.get(id=request.data["id"]).pk
        queryset = InterviewHistory.objects.filter(applicant=applicant)
        # return queryset
        serializer = InterviewHistorySerializer(queryset, many=True)
        return Response(serializer.data) 


class HistApplicantViewSet(generics.ListCreateAPIView):
    serializer_class=ApplicantSerializer
    
    def post(self, request, *args, **kwargs):
        vacancy=IndividualVacancies.objects.get(id=request.data["vacId"]).pk
        queryset = MasterApplicant.objects.filter(individual_vacancy=vacancy, is_active=True)
        serializer = ApplicantSerializer(queryset, many=True)
        return Response(serializer.data)




class ApplicantRemoveView(generics.ListCreateAPIView):
    serializer_class = ApplicantSerializer

    def post(self,request, *args, **kwargs):
        
        applicant=MasterApplicant.objects.get(id=request.data["id"])
        applicant.is_active=False
        applicant.save()
    
        return Response({
            'delete':"deleted"
        })
