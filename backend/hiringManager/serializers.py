from rest_framework import serializers
from adminManager.models import MasterEmployee, JobLocation, JobRole
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import MasterSkill,IndividualVacancies,MasterVacancy
from talentManager.models import MasterApplicant,InterviewHistory


# class RegisterSerializer(serializers.ModelSerializer):
   
#     print("soyo")

#     class Meta:
#         model = MasterEmployee
#         fields = ('emp_name', 'username', 'password',
#                   'email', 'designation', 'location')
#         extra_kwargs = {'password': {'write_only': True}}

#     def to_internal_value(self, data):
#         print("dhukeche")
#         if 'designation' in data:
#             i = 0
#             for x in data['designation']:
#                 id = JobRole.objects.get(designation=x)
#                 print(id)
#                 data['designation'][i] = id.pk
#                 #print( data['designation'][i] )
#                 i=i+1
        
#         if 'location' in data:
#             id = JobLocation.objects.get(location=data['location'])
#             data['location'] = id.pk
#             print(id)
#             #print( data['location'])
#         obj = super(RegisterSerializer, self).to_internal_value(data)

#         return obj

    

#     def create(self, validated_data):
        
#         print("yo2")
#         user = MasterEmployee.objects.create_user(validated_data['emp_name'], validated_data['username'], validated_data['password'],
#                                                   validated_data['email'], validated_data['designation'], validated_data['location'])
#         if user:
#             return user
#         raise serializers.ValidationError("Creation Failed")



class SkillSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterSkill
        fields = '__all__'

class JobLocationSerialzer(serializers.ModelSerializer):
    class Meta:
        model = JobLocation
        fields = '__all__'

class JobRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRole
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    location = JobLocationSerialzer()
    designation = JobRoleSerializer(read_only=True, many=True)
    class Meta:
        model = MasterEmployee
        fields = '__all__'


class ApplicantSerializer(serializers.ModelSerializer):
    preffered_location = JobLocationSerialzer()
    skills= SkillSetSerializer(read_only=True, many=True)
    class Meta:
        model = MasterApplicant
        fields = '__all__'


class VaccancySerializer(serializers.ModelSerializer):
    vac_location=JobLocationSerialzer()
    skills=SkillSetSerializer(read_only=True, many=True)
    hiringManager=EmployeeSerializer()

    class Meta:
        model = MasterVacancy
        fields = '__all__'

class IndividualVaccancySerializer(serializers.ModelSerializer):
    vac_location=JobLocationSerialzer()
    skills=SkillSetSerializer(read_only=True, many=True)
    hiringManager=EmployeeSerializer()

    class Meta:
        model = IndividualVacancies
        fields = '__all__'

class InterviewHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = InterviewHistory
        fields = '__all__'

class PostVaccancySerializer(serializers.ModelSerializer) :

    class Meta:
        model= MasterVacancy
        fields=('hiringManager',  
                'vac_name',
                'vac_designation',
                'project_name',
                'comments',
                'yrs_of_exp',
                'no_of_vacancies','skills', 'vac_location' )
        extra_kwargs = {}        

    def to_internal_value(self, data):
        if 'hiringManager' in data:
            x=MasterEmployee.objects.get(id=data['hiringManager'])
            data['hiringManager']=x.pk

        if 'vac_location' in data:
            loc=JobLocation.objects.get(location=data['vac_location'])
            data['vac_location']=loc.pk

        if 'skills' in data:
            n=0
            for s in data['skills']:
                skill=MasterSkill.objects.get(skill_name=s)
                data['skills'][n]=skill.pk
                n=n+1         
        
        obj = super(PostVaccancySerializer, self).to_internal_value(data)


        return obj


    # def is_valid(self):
    #     print("here")
    #     return False

    def create(self, validated_data):
        
        print("yo2")
        vacancy = MasterVacancy.objects.create(validated_data['hiringManager'], validated_data['vac_name'], validated_data['vac_designation'],
                                                  validated_data['project_name'], validated_data['comments'], validated_data['yrs_of_exp'],
                                                  validated_data['no_of_vacancies'],validated_data['skills'],validated_data['vac_location'])
        if vacancy:
            return vacancy
        raise serializers.ValidationError("Creation Failed")