from django.shortcuts import render
from rest_framework import viewsets, permissions 
from rest_framework.response import Response 
from rest_framework.decorators import action 
from django.contrib.auth import authenticate 
from rest_framework.authtoken.models import Token 
from .models import User 
from .serializers import UserSerializer
# Create your views here.
class UserViewSet(viewsets.ModelViewSet): 
    queryset = User.objects.all() 
    serializer_class = UserSerializer 
    permission_classes = [permissions.AllowAny] 
    @action(detail=False, methods=['post']) 
    def login(self, request): 
        username = request.data.get('username') 
        password = request.data.get('password') 
        user = authenticate(username=username, password=password) 
        if user: 
            token, created = Token.objects.get_or_create(user=user) 
            return Response({'token': token.key, 'role': user.role}) 
        return Response({'error': 'Invalid credentials'}, status=400)