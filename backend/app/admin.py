from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Categorie)
admin.site.register(Review)
admin.site.register(User)
admin.site.register(Client)
admin.site.register(Artisan)
admin.site.register(TechnicalIntervention)
admin.site.register(Proposal)

admin.site.site_header = "OpenMarket"
admin.site.site_title = "OpenMarket"