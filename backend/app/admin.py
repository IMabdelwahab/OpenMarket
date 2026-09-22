# Register your models here.
from django.contrib import admin
from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('id','first_name','last_name', 'phone_number', 'role', 'is_staff', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_superuser')
    search_fields = ('phone_number',)
    ordering = ('id',)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'user','user__first_name','user__last_name')
    search_fields = ('user__phone_number',)
    ordering = ('id',)

class ArtisanAdmin(admin.ModelAdmin):
    list_display = ('id', 'user','user__first_name','user__last_name','categorie')
    search_fields = ('user__phone_number',)
    ordering = ('id',)





admin.site.register(Categorie)
admin.site.register(Review)
admin.site.register(User, UserAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Artisan, ArtisanAdmin)
admin.site.register(TechnicalIntervention)
admin.site.register(Proposal)

admin.site.site_header = "OpenMarket"
admin.site.site_title = "OpenMarket"