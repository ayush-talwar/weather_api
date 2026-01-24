from rest_framework.decorators import api_view
import requests
from rest_framework.response import Response
from django.conf import settings
from django.core.cache import cache
from rest_framework import status
# Create your views here.
@api_view(['GET'])
def WeatherAPI(request):
    city = request.query_params.get('city')
    cache_key = f'weather:{city.strip().lower()}'
    cached_data = cache.get(cache_key)
    if cached_data:
        return Response({
            "source": "cache",
            "data": cached_data
            }, status=status.HTTP_200_OK
        )
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": settings.WEATHER_API_KEY,
        "units": "metric"
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        return Response({
            "error": "Could not fetch weather data"
        }, status=response.status_code)
    weather_data = response.json()
    cache.set(cache_key, weather_data, timeout=settings.CACHE_TTL)
    return Response({
        "source": "api",
        "data": weather_data
    }, status=status.HTTP_200_OK)