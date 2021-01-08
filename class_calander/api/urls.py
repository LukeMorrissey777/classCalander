from django.urls import path
from .views import CourseView,AddCourseView, GetCoursesView,DeleteCourseView

urlpatterns = [
    path('course',CourseView.as_view()),
    path('add-course',AddCourseView.as_view()),
    path('course-view',GetCoursesView.as_view()),
    path('delete-course',DeleteCourseView.as_view())
]