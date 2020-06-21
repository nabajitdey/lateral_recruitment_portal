from rest_framework import serializers
from adminManager.models import MasterEmployee, JobLocation, JobRole
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from hiringManager.models import MasterSkill,MasterVacancy,IndividualVacancies
from .models import MasterApplicant, InterviewLevel, InterviewHistory

class InterviewLevelsSerializer(serializers.ModelSerializer):
    class Meta:
        model =InterviewLevel
        fields = '__all__'

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

class ApplicantRegistrationSerializer(serializers.ModelSerializer) :

    class Meta:
        model= MasterApplicant
        fields=('email',  
                'app_name',
                'yrs_of_exp',
                'skills', 
                'preffered_location' )
        extra_kwargs = {}        

    def to_internal_value(self, data):

        if 'preffered_location' in data:
            loc=JobLocation.objects.get(location=data['preffered_location'])
            data['preffered_location']=loc.pk

        if 'skills' in data:
            n=0
            for s in data['skills']:
                skill=MasterSkill.objects.get(skill_name=s)
                data['skills'][n]=skill.pk
                n=n+1         
        
        obj = super(ApplicantRegistrationSerializer, self).to_internal_value(data)


        return obj

    def create(self, validated_data):
        
        print("yo2")
        applicant = MasterApplicant.objects.create(validated_data['email'], validated_data['app_name'], validated_data['yrs_of_exp'],
                                                 validated_data['skills'],validated_data['preffered_location'])
        if applicant:
            return applicant
        raise serializers.ValidationError("Creation Failed")
    
        

class IntvHistoryUpdateSerializer(serializers.ModelSerializer) :

    class Meta:
        model= InterviewHistory
        fields=('applicant',  
                'comments',
                'result',
                'interview_level', 
                 )
        extra_kwargs = {}        

    def to_internal_value(self, data):

        if 'applicant' in data:
            app=MasterApplicant.objects.get(id=data['applicant'])
            data['applicant']=app.pk

        if 'interview_level' in data:
            loc=InterviewLevel.objects.get(level_name=data['interview_level'])
            data['interview_level']=loc.pk    

        
        obj = super(IntvHistoryUpdateSerializer, self).to_internal_value(data)


        return obj
    # def is_valid(self):
    #     print("here")
    #     return False

    

class InterviewHistorySerializer(serializers.ModelSerializer):

    interview_level=InterviewLevelsSerializer()

    class Meta:
        model = InterviewHistory
        fields = '__all__'