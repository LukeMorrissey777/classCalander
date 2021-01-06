from django.urls import path
from .views import CourseView,AddCourseView, GetCoursesView

urlpatterns = [
    path('course',CourseView.as_view()),
    path('add-course',AddCourseView.as_view()),
    path('course-view',GetCoursesView.as_view())
]