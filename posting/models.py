from django.db import models

# Create your models here.

class Post(models.Model):
    user = models.ForeignKey('user.AbstractHostelUser', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.CharField(max_length=100)

    def __str__(self):
        return self.title