from pathlib import Path

from django.db import transaction
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
        fields = ['id','first_name','last_name','email','phone_number','role','city','neighborhood']
        # fields = '__all__'
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


class ServiceRequestCreateSerializer(serializers.ModelSerializer):
    attachments = serializers.ListField(
        child=serializers.FileField(),
        required=False,
        write_only=True,
    )

    class Meta:
        model = ServiceRequest
        fields = (
            "id",
            "description",
            "localisation",
            "categorie",
            "sous_service",
            "ville",
            "etage",
            "ascenseur",
            "stationnement",
            "urgence",
            "date_intervention",
            "creneau",
            "statut",
            "attachments",
        )
        read_only_fields = ("id", "statut")

    def validate_description(self, value):
        if len(value.strip()) < 20:
            raise serializers.ValidationError(
                "La description doit contenir au moins 20 caractères."
            )
        return value.strip()

    def validate(self, attrs):
        if not attrs["urgence"] and not attrs.get("date_intervention"):
            raise serializers.ValidationError({
                "date_intervention": "Choisissez une date pour une intervention programmée."
            })
        if attrs["urgence"]:
            attrs["date_intervention"] = None
            attrs["creneau"] = ""
        return attrs

    def validate_attachments(self, files):
        if len(files) > 5:
            raise serializers.ValidationError("Vous pouvez joindre au maximum 5 fichiers.")

        allowed_extensions = {".jpg", ".jpeg", ".png", ".heic", ".mp4"}
        for file in files:
            if file.size > 15 * 1024 * 1024:
                raise serializers.ValidationError(
                    f"{file.name} dépasse la limite de 15 Mo."
                )
            if Path(file.name).suffix.lower() not in allowed_extensions:
                raise serializers.ValidationError(
                    f"Le format de {file.name} n'est pas accepté."
                )
        return files

    @transaction.atomic
    def create(self, validated_data):
        attachments = validated_data.pop("attachments", [])
        service_request = super().create(validated_data)
        for file in attachments:
            ServiceRequestAttachment.objects.create(
                service_request=service_request,
                fichier=file,
                nom_original=Path(file.name).name,
            )
        return service_request
