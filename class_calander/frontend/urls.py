from django.urls import path
from .views import index

urlpatterns = [
    path('',index),
    path('add',index),
    path('class-view',index)
]