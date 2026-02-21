from rest_framework import generics
from .models import WebApp
from .serializers import WebAppSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class WebAppListCreateView(generics.ListCreateAPIView):
    """
    Handles GET /webapps/ (List all apps)
    Handles POST /webapps/ (Create a new app with environments)
    """
    queryset = WebApp.objects.all()
    serializer_class = WebAppSerializer

class WebAppDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles GET, PUT, DELETE for a single app by ID
    Example: /webapps/<uuid>/
    """
    queryset = WebApp.objects.all()
    serializer_class = WebAppSerializer

@method_decorator(csrf_exempt, name='dispatch')
class WebAppListCreateView(generics.ListCreateAPIView):
    queryset = WebApp.objects.all()
    serializer_class = WebAppSerializer