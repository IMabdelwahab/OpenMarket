from rest_framework import serializers
from .models import *

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    class Meta:
        model = User
        # fields = ['id','first_name','email_address','phone_number','role']
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data) 
    # it is important for the password to get hashed
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
            instance.save(update_fields=['password'])
        return instance

class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    # read. only beacuse DRF default create/update() only knows how to write flat fields  
    # The habit to take forward: nested serializers are for output shape, not input.
    class Meta:
        model = Client
        fields = '__all__'

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class ArtisanSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    categorie = CategorieSerializer(read_only=True)
    categorieId = serializers.PrimaryKeyRelatedField(
        queryset = Categorie.objects.all(), 
        source = 'categorie', 
        write_only = True
    )
    class Meta:
        model = Artisan
        fields = '__all__'
