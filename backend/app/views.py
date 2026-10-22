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
#   #   #   USER 
@api_view(['GET'])
def getUsersApi(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserByIdApi(request,id):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getUserRole(request,phoneNumber):
    
    try:
        user = User.objects.get(phone_number=phoneNumber)
    except User.DoesNotExist:
        return Response({'message' : 'user does not exist'})
    serializer = UserSerializer(user, many=False)
    role = serializer.data['role']
    return Response({'role' : role})

@api_view(['POST'])
def addUser(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUserByPhone(request):
    data = request.data.copy()
    try:
        user = User.objects.get(phone_number = data['phone_number'])
        user.delete()
    except User.DoesNotExist:
        return Response({"message" : "user doesn't exist"})
    return Response({"message" : "success"})

#   #   #   CLIENT 
@api_view(['GET'])
@permission_classes(IsAuthenticated)
def getClientByPhoneApi(request,phone_number):
    client = Client.objects.get(phone_number=phone_number)
    serializer = ClientSerializer(client, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addClient(request):
    data = request.data.copy()
    data["role"] = User.Role.CLIENT
    data["first_name"] = data["first_name"].capitalize()
    data["last_name"] = data["last_name"].capitalize()
    userSerializer = UserSerializer(data = data)
    if userSerializer.is_valid(raise_exception=True):
        user = userSerializer.save()
        Client.objects.create(user = user)
    return Response(userSerializer.data)

@api_view(['PUT'])
@permission_classes(IsAuthenticated)
def updateClient(request):
    data = request.data.copy()
    user = User.objects.get(phone_number=data['phone_number'])
    userSerializer = UserSerializer(
        user,
        data=data,
        partial=True
    )
    if not userSerializer.is_valid():
        return Response(userSerializer.errors, status=400)
    userSerializer.save()
    return Response(userSerializer.data)



#   #   #   ARTISAN
@api_view(['GET'])
def getArtisanById(request):
    data = request.data.copy()
    try :
        artisan = Artisan.objects.get(id=data['id'])
    except Artisan.DoesNotExist:
        return Response({"message" : "does not exist"})
    
    serializer = ArtisanSerializer(artisan, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getArtisanByPhoneNumber(request):
    data = request.data.copy()
    try :
        artisan = Artisan.objects.get(user__phone_number=data['phone_number'])
    except Artisan.DoesNotExist:
        return Response({"message" : "does not exist"})
        
    serializer = ArtisanSerializer(artisan, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addArtisan(request):
    data = request.data.copy()
    specialities = data["specialities"] if data["specialities"] != None else ""
    data["role"] = User.Role.ARTISAN
    data["first_name"] = data["first_name"].capitalize()
    data["last_name"] = data["last_name"].capitalize()
    # cin = data["cin"].upper()
    userSerializer = UserSerializer(data = data)
    
    if userSerializer.is_valid(raise_exception=True):
        user = userSerializer.save()
        city = City.objects.get(id=data['cityId'])
        User.objects.filter(id=user.id).update(city=city)  # Update the city field of the user instance

        if data['categorieId']:
            categorie = Categorie.objects.get(id = data['categorieId'])
            Artisan.objects.create(
                    user = user, 
                    categorie=categorie, 
                    specialities=specialities,
                    # cin=cin
            )
        else :
            Artisan.objects.create(
                    user = user, 
                    specialities=specialities
            )    
        
        return Response(userSerializer.data)
    return Response({"error" : "serializer is not valid"})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateArtisan(request):
    data = request.data.copy()
    user = User.objects.get(phone_number=data['phone_number'])
    userSerializer = UserSerializer(user, data=data, partial=True)
    #I used partial=True so the client doesn't have to resend every field just to update a couple
    
    if not userSerializer.is_valid():
        return Response(userSerializer.errors, status=400)

    userSerializer.save()
    artisan = Artisan.objects.get(user=user)
    artisanSerializer = ArtisanSerializer(artisan, data=data, partial=True)

    if not artisanSerializer.is_valid():
        return Response(artisanSerializer.errors, status=400)

    artisanSerializer.save()
    return Response(artisanSerializer.data)


#   #   #   CATEGORIES
@api_view(['GET'])
def getCatgeories(request):
    categories = Categorie.objects.all()
    serializer = CategorieSerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCities(request):
    cities = City.objects.all()
    serializer = CitySerializer(cities, many=True)
    return Response(serializer.data)