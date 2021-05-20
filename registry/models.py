from django.db import models

class Patient (models.Model):
  name = models.CharField(max_length=30)
  age = models.CharField(max_length=40)
  animal = models.CharField(max_length=30)
  description = models.CharField(max_length=200)
  created_at = models.DateTimeField(auto_now_add=True)
  completed = models.BooleanField()