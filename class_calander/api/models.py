from django.db import models
import random
import string

# Create your models here.
def generate_unique_code():
    length = 8
    while True:
        code = ''.join(random.choices(string.ascii_uppercase,k=length))
        if Course.objects.filter(code=code).count() ==0:
            break

    return code

class Course(models.Model):
    name = models.CharField(max_length=50,unique=False)
    zoom  = models.CharField(max_length=50,unique=False)
    host = models.CharField(max_length=50,unique=False)
    created_at = models.DateTimeField(auto_now_add=True)
    class_days = models.CharField(max_length=7, default='0000000')    #days when classes are held(0 for no class 1 for class)
    start_time = models.CharField(max_length=5)
    class_duration = models.IntegerField(null=False,default=50)
    code = models.CharField(max_length=8,default=generate_unique_code,unique=True)


     