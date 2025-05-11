from django.shortcuts import render
from django.conf import settings
from django.views import View
from .models import Projects, Skills, BlogPost

# Create your views here.

class HomeView(View):
    def get(self, request):
        return render(request, 'main/index.html', {
            'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY,
        })
    
class ResumeView(View):
    def get(self, request):
        return render(request, 'main/resume.html')

class ContactView(View):
    def get(self, request):
        return render(request, 'main/contact.html', {
            'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY,
        })
    
class PortfolioView(View):
    def get(self, request):
        projects = Projects.objects.all()  # Load projects
        return render(request, 'main/portfolio.html', {'projects': projects})

class GithubView(View):
    def get(self, request):
        return render(request, 'main/github.html')