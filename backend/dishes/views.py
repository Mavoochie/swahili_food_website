from django.shortcuts import render
from rest_framework import viewsets, permissions 
from .models import Dish 
from .serializers import DishSerializer
# Create your views here.
class DishViewSet(viewsets.ModelViewSet): 
    queryset = Dish.objects.all() 
    serializer_class = DishSerializer 
    permission_classes = [permissions.AllowAny]