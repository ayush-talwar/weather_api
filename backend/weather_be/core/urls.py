from django.urls import path
from .views import WeatherAPI

urlpatterns = [
    path('', WeatherAPI)
]
