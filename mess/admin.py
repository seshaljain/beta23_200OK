from django.contrib import admin

# Register your models here.

from .models import MessNotEating

class MessNotEatingAdmin(admin.ModelAdmin):
    pass

admin.site.register(MessNotEating, MessNotEatingAdmin)
