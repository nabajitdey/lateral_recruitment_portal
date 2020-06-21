from rest_framework import serializers
from adminManager.models import MasterEmployee, JobLocation, JobRole
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.db.models import Q
from hiringManager.models import MasterSkill
# from app.models import User


class JobLocationSerialzer(serializers.ModelSerializer):
    class Meta:
        model = JobLocation
        fields = '__all__'


class JobRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRole
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
   
    print("soyo")

    class Meta:
        model = MasterEmployee
        fields = ('emp_name', 'username', 'password',
                  'email', 'designation', 'location')
        extra_kwargs = {'password': {'write_only': True}}

    def to_internal_value(self, data):
        print("dhukeche")
        if 'designation' in data:
            i = 0
            for x in data['designation']:
                id = JobRole.objects.get(designation=x)
                print(id)
                data['designation'][i] = id.pk
                #print( data['designation'][i] )
                i=i+1
        
        if 'location' in data:
            id = JobLocation.objects.get(location=data['location'])
            data['location'] = id.pk
            print(id)
            #print( data['location'])
        obj = super(RegisterSerializer, self).to_internal_value(data)

        return obj

    

    def create(self, validated_data):
        
        print("yo2")
        user = MasterEmployee.objects.create_user(validated_data['emp_name'], validated_data['username'], validated_data['password'],
                                                  validated_data['email'], validated_data['designation'], validated_data['location'])
        if user:
            return user
        raise serializers.ValidationError("Creation Failed")


class EmployeeSerializer(serializers.ModelSerializer):
    location = JobLocationSerialzer()
    designation = JobRoleSerializer(read_only=True, many=True)
    class Meta:
        model = MasterEmployee
        fields = '__all__'
    
    def create(self, validated_data):
        masterEmployee=MasterEmployee.objects.create_user(**validated_data)
        Token.objects.create(masterEmployee=masterEmployee)
        return masterEmployee

class SkillSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterSkill
        fields = '__all__'
    def create(self):
        return MasterSkill(**self.validated_data)

class RegisterSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterSkill
        fields = '__all__'
    # def create(self):
    #     return MasterSkill(**self.validated_data)