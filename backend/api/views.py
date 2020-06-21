from django.shortcuts import render
from rest_framework import viewsets, generics
from adminManager.models import MasterEmployee,JobRole
from api.serializers import EmployeeSerializer,JobRoleSerializer,LoginSerializer

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authtoken.views import obtain_auth_token



class EmployeeViewSet (viewsets.ModelViewSet ):
    queryset = MasterEmployee.objects.all()
    serializer_class = EmployeeSerializer

    
class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': user
        })

class LoginAPI(generics.GenericAPIView):
  print("yoso")
  serializer_class = LoginSerializer
  print("yoko")
  def post(self, request, *args, **kwargs):

    serializer = self.get_serializer(data=request.data)

    serializer.is_valid(raise_exception=True)
    print("yoso")
    user = serializer.validated_data
    token, created = Token.objects.get_or_create(user=user)

    return Response({
      "user": EmployeeSerializer(user, context=self.get_serializer_context()).data,
      "token": token.key
    })
