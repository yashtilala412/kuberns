from django.urls import path
from .views import WebAppListCreateView, WebAppDetailView

urlpatterns = [
    path('webapps/', WebAppListCreateView.as_view(), name='webapp-list-create'),
    path('webapps/<uuid:pk>/', WebAppDetailView.as_view(), name='webapp-detail'),
]