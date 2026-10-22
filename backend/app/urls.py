from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.home, name="home" ),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #   #   #
    
    path('api/getUsers/', views.getUsersApi, name="get_users_api"),
    path('api/getUserRole/<str:phoneNumber>', views.getUserRole, name="get_user_role"),
    path('api/getUser/<int:id>/', views.getUserByIdApi, name="get_user_by_id_api"),
    path('api/addUser/', views.addUser, name="add_user"),

    path('api/getClient/<int:phone_number>/', views.getClientByPhoneApi, name="get_client_by_id_api"),
    path('api/addClient/', views.addClient, name="add_client"),
    path('api/updateClient/', views.updateClient, name="update_client"),
    path('api/deleteUser/', views.deleteUserByPhone, name="delete_user"),

    path('api/addArtisan/', views.addArtisan, name="add_artisan"),
    path('api/updateArtisan/', views.updateArtisan, name="update_artisan"),
    path('api/getArtisan/', views.getArtisanById, name="get_artisan"),
    path('api/getArtisanPhone/', views.getArtisanByPhoneNumber, name="get_artisan_phone"),

    path('api/getCategories/', views.getCatgeories, name='get_categories'),
    path('api/getCities/', views.getCities, name='get_cities'),
]