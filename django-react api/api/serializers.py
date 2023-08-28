from .models import *
from rest_framework import serializers


class EmployeeSerializer(serializers.HyperlinkedModelSerializer):
    id=serializers.ReadOnlyField()
    class Meta:
        model=Employee
        fields=['id', 'name', 'company', 'position','email','address','phone_number']

class CompanySerializer(serializers.HyperlinkedModelSerializer):
    employees = EmployeeSerializer(many=True, read_only=True)
    class Meta:
        model=Company
        fields=['id', 'name', 'location','employees']

