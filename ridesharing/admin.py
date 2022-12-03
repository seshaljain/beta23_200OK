from django.contrib import admin

# Register your models here.
from .models import Ride

class RideAdmin(admin.ModelAdmin):
    pass

admin.site.register(Ride, RideAdmin)