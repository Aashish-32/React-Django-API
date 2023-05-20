from django.contrib import admin
from api.models import *
# Register your models here.

class CompanyAdmin(admin.ModelAdmin):
    list_display=('name','location','type')
    search_fields=['name']

class EmployeeAdmin(admin.ModelAdmin):
    list_display=('name','email','position','company','address')
    list_filter=('position','company')


admin.site.register(Company,CompanyAdmin)
admin.site.register(Employee, EmployeeAdmin)
