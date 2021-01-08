from django.db import models
from rest_framework import fields, serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id','name','zoom','host','created_at','class_days','start_time','class_duration','code')

class AddCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name','zoom','class_days','start_time','class_duration')

class DeleteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['code']