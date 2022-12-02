from django.contrib import admin

from user.models import AbstractHostelUser, Room, Student, Complaint

# Register your models here.

class AbstractHostelUserAdmin(admin.ModelAdmin):
    pass

admin.site.register(AbstractHostelUser, AbstractHostelUserAdmin)

class StudentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Student, StudentAdmin)

class RoomAdmin(admin.ModelAdmin):
    pass

admin.site.register(Room, RoomAdmin)

class ComplaintAdmin(admin.ModelAdmin):
    pass

admin.site.register(Complaint, ComplaintAdmin)