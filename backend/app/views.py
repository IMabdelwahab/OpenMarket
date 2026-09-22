from django.shortcuts import render
from django.http import HttpResponse
from django.db import transaction

from .serializers import *
from .models import *
# from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

def home(request):
    return HttpResponse("hello")
    # just to test the app working well

@api_view(['GET'])
def getUsersApi(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUserByIdApi(request,id):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getClientByIdApi(request,id):
    client = Client.objects.get(id=id)
    serializer = ClientSerializer(client, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def addClient(request):
    data = request.data.copy()
    data["role"] = User.Role.CLIENT
    userSerializer = UserSerializer(data = data)
    if userSerializer.is_valid(raise_exception=True):
        user = userSerializer.save()
        Client.objects.create(user = user)
    return Response(userSerializer.data)

@api_view(['POST'])
def addArtisan(request):
    data = request.data.copy()
    specialities = data["specialities"]
    data["role"] = User.Role.ARTISAN
    userSerializer = UserSerializer(data = data)
    if userSerializer.is_valid(raise_exception=True):
        user = userSerializer.save()
        Artisan.objects.create(user = user,specialities=specialities)
        return Response(userSerializer.data)
    return Response({"error" : "serializer is not valid"})

@api_view(['GET'])
def getCatgeories(request):
    categories = Categorie.objects.all().values('nom')
    serializer = CategorieSerializer(categories, many=True)
    return Response(serializer.data)