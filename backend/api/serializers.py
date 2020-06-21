from rest_framework import serializers
from adminManager.models import MasterEmployee, JobLocation, JobRole
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


class JobLocationSerialzer(serializers.ModelSerializer):
    class Meta:
        model = JobLocation
        fields='__all__'

class JobRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRole
        fields ='__all__'


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
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password= serializers.CharField()

    def validate(self, data):
        print("eikhane")
        user = authenticate(**data)
        #print(user.location.location)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
    
   