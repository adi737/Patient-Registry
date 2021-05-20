from registry.models import Patient
from rest_framework import viewsets, permissions
from .serializers import PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
  queryset = Patient.objects.all()
  serializer_class = PatientSerializer
  permission_classes = [
    permissions.AllowAny
  ]