from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response

#create viewset of company.. 

class CompanyViewSet(viewsets.ModelViewSet):
    id=serializers.ReadOnlyField
    queryset=Company.objects.all()
    serializer_class=CompanySerializer

    @action(detail=True,url_path="employees",methods=['get'])
    def employees(self,request,pk=None):
        try:
            company=Company.objects.get(pk=pk)
            emp=Employee.objects.filter(company=company)
            emp_serializer=EmployeeSerializer(emp,many=True,context={'request':request})                                     #vvi need to be serialised so
            return Response(emp_serializer.data)

        except:
            return Response("not existing")



#create viewset of company

# Create your views here.
class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class=EmployeeSerializer
    queryset=Employee.objects.all()


