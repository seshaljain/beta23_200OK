from django.db import models

# Create your models here.


class Ride(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('user.AbstractHostelUser',
                             on_delete=models.CASCADE)
    has_vehicle = models.BooleanField(default=False)
    vehicle_type = models.CharField(max_length=100, blank=True)
    finished = models.BooleanField(default=False)

    start_time = models.DateTimeField(null=True)

    def __str__(self):
        return f"Ride {self.id}"
