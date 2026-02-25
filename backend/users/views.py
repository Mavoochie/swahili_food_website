from django.shortcuts import render
from rest_framework import viewsets, permissions 
from rest_framework.response import Response 
from rest_framework.decorators import action 
from django.contrib.auth import authenticate 
from rest_framework.authtoken.models import Token 
from .models import User 
from .serializers import UserSerializer
# Create your views here.
