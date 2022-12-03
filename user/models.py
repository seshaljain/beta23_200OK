from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class AbstractHostelUser(AbstractUser):
    is_student = models.BooleanField(default=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "username"
    EMAIL_FIELD: str = "email"

class Student(models.Model):
    user = models.OneToOneField(
        AbstractHostelUser,
        default=None,
        null=True,
        on_delete=models.CASCADE)

    student_name = models.CharField(max_length=200, null=True)
    father_name = models.CharField(max_length=200, null=True)
    enrollment_no = models.CharField(max_length=10, unique=True, null=True)
    course = models.CharField(max_length=200, null=True)
    
    room = models.CharField(max_length=200, null=True)
    room_allotted = models.BooleanField(default=False)
    no_dues = models.BooleanField(default=True)

    def __str__(self):
        return self.enrollment_no



class Hostel(models.Model):
    name = models.CharField(max_length=5)
    gender_choices = [('M', 'Male'), ('F', 'Female')]
    gender = models.CharField(
        choices=gender_choices,
        max_length=1,
        default=None,
        null=True)
    course = models.ManyToManyField('Course', default=None, blank=True)
    caretaker = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    # if a student has enrollment number iit2017001 then the course code is iit2017
    code = models.CharField(max_length=100, default=None)
    room_choice = [('S', 'Single Occupancy'), ('D', 'Double Occupancy'), ('P', 'Reserved for Research Scholars'), ('B', 'Both Single and Double Occupancy')]
    room_type = models.CharField(choices=room_choice, max_length=1, default='D')

    def __str__(self):
        return self.code


class Warden(models.Model):
    user = models.OneToOneField(
        AbstractHostelUser,
        default=None,
        null=True,
        on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    hostel = models.ForeignKey('Hostel',
        default=None,
        null=True,
        on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Complaint(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    complaint = models.CharField(max_length=1000)
    date = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.complaint


class StudentInOutTime(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    in_time = models.DateTimeField(null=True)
    out_time = models.DateTimeField(null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.student.enrollment_no