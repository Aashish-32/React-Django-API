from django.db import models

# Create your models here.

choices=(('IT', 'IT'), ('NON_IT','NON_IT'),('phones','phones'))
class Company(models.Model):
    #id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=300)
    location=models.CharField(max_length=50)
    about=models.TextField(null=False,blank=False)
    type=models.CharField(max_length=100,choices=choices)
    added_date=models.DateField(auto_now_add=True)
    active=models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField()
    address=models.CharField(max_length=200)
    phone_number=models.DecimalField(max_digits=10,decimal_places=0)
    about=models.TextField()
    position=models.CharField(max_length=50, choices=(('manager','manager'), ('Software Developer','Software Dev'),('Project Manager','project manager')))   
    company=models.ForeignKey(Company, on_delete=models.CASCADE)


    def __str__(self):
        return self.name