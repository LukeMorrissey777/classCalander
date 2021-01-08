from django.http import response
from django.shortcuts import render
from rest_framework import generics, serializers,status
from .models import Course
from .serializer import CourseSerializer, AddCourseSerializer, DeleteCourseSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class CourseView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class AddCourseView(APIView):
    serializer_class = AddCourseSerializer
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data =request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            zoom = serializer.data.get('zoom')
            class_days = serializer.data.get('class_days')
            start_time = serializer.data.get('start_time')
            class_duration = serializer.data.get('class_duration')
            host = self.request.session.session_key

            course = Course(name=name,zoom=zoom,class_duration=class_duration,class_days=class_days,start_time=start_time,host=host)
            course.save()
            return Response(CourseSerializer(course).data,status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetCoursesView(APIView):
    serializer_class = CourseSerializer
    def get(self,request,format=None):
        courses = Course.objects.filter(host=self.request.session.session_key)
        if len(courses) > 0:
            data = []
            for course in courses:
                data.append(CourseSerializer(course).data)
            return Response(data,status=status.HTTP_200_OK)
        return Response({'Bad Request':'No Classes for User'},status=status.HTTP_400_BAD_REQUEST)

class DeleteCourseView(APIView):
    serializer_class = DeleteCourseSerializer
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            code = serializer.data.get('code')
            course = Course.objects.filter(code=code)
            if len(course)>0:
                course[0].delete()
            return Response({"Message":"Success"},status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
