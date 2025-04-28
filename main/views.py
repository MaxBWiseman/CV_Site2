from django.shortcuts import render
from django.conf import settings
from django.views import View

# Create your views here.

class HomeView(View):
    def get(self, request):
        return render(request, 'main/index.html', {
            'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY,
        })
    
class ResumeView(View):
    def get(self, request):
        return render(request, 'main/resume.html')