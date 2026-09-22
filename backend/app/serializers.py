from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    # def create(self, validated_data):
    #     return User.objects.create_user(**validated_data)

    # def update(self, instance, validated_data):
    #     password = validated_data.pop('password', None)
    #     instance = super().update(instance, validated_data)
    #     if password:
    #         instance.set_password(password)
    #         instance.save(update_fields=['password'])
    #     return instance

class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    class Meta:
        model = Client
        fields = '__all__'

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class ArtisanSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    categorie = CategorieSerializer(read_only=False)
    class Meta:
        model = Artisan
        fields = '__all__'
