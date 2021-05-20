from django.db import router
from rest_framework import routers
from .api import PatientViewSet

router = routers.DefaultRouter()
router.register('api/registry', PatientViewSet, 'registry')

urlpatterns = router.urls