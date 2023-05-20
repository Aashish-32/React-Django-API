from django.db import models
class New(models.Model):
    name=models.CharField(max_length=30)


from rest_framework import serializers

class SerializerList(serializers.HyperlinkedModelSerializer):
    class meta:
        model=New
        field='__all__'


from rest_framework import viewsets
 class CompanyViewSet(viewsets.ModelViewSet):
   queryset=New.objects.all()
   serializer_class=SerializerList


from django.shortcuts import render
from django.http import HttpResponse
from django.urls import path, include
from rest_framework import routers
router= routers.BaseRouter
router.register("cs",CompanyViewSet)


urlpatterns=[
   path(" ", include(router.urls))

]
   