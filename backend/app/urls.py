from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.home, name="home" ),
    #   #   #
    path('getUsers/', views.getUsersApi, name="get_users_api"),
    path('getUser/<int:id>/', views.getUserByIdApi, name="get_user_by_id_api"),
    path('getClient/<int:id>/', views.getClientByIdApi, name="get_client_by_id_api"),
    path('addUser/', views.addUser, name="add_user"),
    path('addClient/', views.addClient, name="add_client"),
    path('addArtisan/', views.addArtisan, name="add_artisan"),
    path('getCategories/', views.getCatgeories, name='get_categories')
]