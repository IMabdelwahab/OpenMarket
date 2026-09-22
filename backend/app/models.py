from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
from django.core.validators import MinLengthValidator


class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number is required")
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(phone_number, password, **extra_fields)

class User(AbstractUser):
    class Role(models.TextChoices):
        CLIENT = "Client" , "Client"
        ARTISAN = "Artisan" , "Artisan"
        ADMIN = "Admin", "Admin"

    username = None  # drop the default field entirely
    phone_number = models.CharField(max_length=10, validators=[MinLengthValidator(10)], unique=True)

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []  # fields prompted for besides USERNAME_FIELD + password, e.g. when using createsuperuser

    objects = UserManager()

    role = models.CharField(max_length=10, choices=Role.choices, default=Role.CLIENT)

class Client(models.Model):
    # """A user who publishes service requests and reviews artisans."""
    user = models.OneToOneField(User,on_delete=models.CASCADE, default=None)
    pass

class Categorie(models.Model):
    nom = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nom
    
class Artisan(models.Model):
    class StatutVerification(models.TextChoices):
        NON_VERIFIE = "NOT_VERIFIED", "Not Verified"
        VERIFIE = "VERIFIED", "Verified"

    user = models.OneToOneField(User,on_delete=models.CASCADE, default=None)
    categorie = models.ForeignKey(
        Categorie, 
        on_delete=models.SET_NULL,
        related_name="artisans",
        null=True 
    )
    specialities = models.CharField(max_length=255, blank=True)
    zone_intervention = models.CharField(max_length=255, blank=True)
    statut_verification = models.CharField(
        max_length=20,
        choices=StatutVerification.choices,
        default=StatutVerification.NON_VERIFIE,
    )


class ServiceRequest(models.Model):
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="serviceRequestes",
    )
    description = models.TextField(max_length=200)
    localisation = models.CharField(max_length=255)
    urgence = models.BooleanField(default=False)
    statut = models.CharField(max_length=50)

    def __str__(self):
        return f"ServiceRequest #{self.pk} - {self.client}"


class Proposal(models.Model):
    serviceRequest = models.ForeignKey(
        ServiceRequest,
        on_delete=models.CASCADE,
        related_name="proposals",
    )
    artisan = models.ForeignKey(
        Artisan,
        on_delete=models.CASCADE,
        related_name="proposals",
    )
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    delai = models.PositiveIntegerField(help_text="Délai de réalisation en jours")
    statut = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    def __str__(self):
        return f"Devis #{self.pk}"


class TechnicalIntervention(models.Model):
    proposal = models.OneToOneField(
        Proposal,
        on_delete=models.CASCADE,
        related_name="intervention",
    )
    date = models.DateTimeField()
    statut = models.CharField(max_length=50)

    def __str__(self):
        return f"Intervention #{self.pk}"

class Review(models.Model):
    intervention = models.OneToOneField(
        TechnicalIntervention,
        on_delete=models.CASCADE,
        related_name="reviews",
    )
    note = models.PositiveSmallIntegerField()
    commentaire = models.TextField(blank=True)

    def __str__(self):
        return f"Avis #{self.pk} ({self.note}/5)"
