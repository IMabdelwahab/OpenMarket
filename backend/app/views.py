from django.shortcuts import render
from django.http import HttpResponse
from .models import *
# from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

def home(request):
    return HttpResponse("hello")