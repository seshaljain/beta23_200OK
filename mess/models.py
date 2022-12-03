from django.db import models

# Create your models here.

from user.models import Student

class MessNotEating(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f'{self.student.student_name} did not eat on {self.date}'
