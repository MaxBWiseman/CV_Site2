from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.views import View
from .models import Projects, Skills, BlogPost

# Create your views here.

class HomeView(View):
    def get(self, request):
        return render(request, 'main/index.html', {
            'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY,
        })
    
def resume_view(request):
    skills = {
        "languages": [
            {"name": "HTML", "percentage": 75, "css_class": "bar-color-1"},
            {"name": "CSS", "percentage": 75, "css_class": "bar-color-2"},
            {"name": "JavaScript", "percentage": 65, "css_class": "bar-color-3"},
            {"name": "Python", "percentage": 55, "css_class": "bar-color-1"},
            {"name": "Sketch/Arduino", "percentage": 25, "css_class": "bar-color-1"},
        ],
        "tools": [
            {"name": "Bootstrap", "percentage": 55, "css_class": "bar-color-1"},
            {"name": "JQuery", "percentage": 55, "css_class": "bar-color-2"},
            {"name": "Jest", "percentage": 55, "css_class": "bar-color-3"},
            {"name": "Flask", "percentage": 55, "css_class": "bar-color-1"},
            {"name": "Django", "percentage": 55, "css_class": "bar-color-1"},
        ],
        "frameworks": [
            {"name": "React", "percentage": 55, "css_class": "bar-color-1"},
            {"name": "Vue", "percentage": 55, "css_class": "bar-color-2"},
            {"name": "Node.js", "percentage": 55, "css_class": "bar-color-3"},
            {"name": "Express", "percentage": 55, "css_class": "bar-color-1"},
            {"name": "Flask", "percentage": 55, "css_class": "bar-color-1"},
        ],
        "databases": [
            {"name": "MySQL", "percentage": 55, "css_class": "bar-color-1"},
            {"name": "PostgreSQL", "percentage": 55, "css_class": "bar-color-2"},
            {"name": "MongoDB", "percentage": 55, "css_class": "bar-color-3"},
            {"name": "SQLite", "percentage": 55, "css_class": "bar-color-1"},
            {"name": "Firebase", "percentage": 55, "css_class": "bar-color-1"},
        ],
    }
    return render(request, "main/resume.html", {"skills": skills})
# {"skills": skills} is used to pass the skills data to the template

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
    
def project_detail(request, slug):
    project = get_object_or_404(Projects, slug=slug)
    return render(request, 'main/project_detail.html', {'project': project})