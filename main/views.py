from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.views import View
from .models import Projects, Skills, BlogPost
from markdown import markdown
import re

# Create your views here.

class HomeView(View):
    def get(self, request):
        return render(request, 'main/index.html', {
            'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY,
        })
    
def resume_view(request):
    skills = {
        "languages": [
            {"name": "HTML", "percentage": 85, "css_class": "bar-color-1"},
            {"name": "CSS", "percentage": 85, "css_class": "bar-color-2"},
            {"name": "JavaScript", "percentage": 85, "css_class": "bar-color-3"},
            {"name": "Python", "percentage": 85, "css_class": "bar-color-1"},
            {"name": "JSX", "percentage": 85, "css_class": "bar-color-2"},
            {"name": "Arduino", "percentage": 25, "css_class": "bar-color-3"},
        ],
        "tools": [
            {"name": "Bootstrap", "percentage": 100, "css_class": "bar-color-1"},
            {"name": "JQuery", "percentage": 80, "css_class": "bar-color-2"},
            {"name": "Jest", "percentage": 55, "css_class": "bar-color-3"},
            {"name": "MATLAB", "percentage": 65, "css_class": "bar-color-1"},
            {"name": "Scikit-Learn", "percentage": 95, "css_class": "bar-color-2"},
            {"name": "TensorFlow", "percentage": 95, "css_class": "bar-color-3"},
            {"name": "TensorFlow-Keras", "percentage": 95, "css_class": "bar-color-1"},
            {"name": "Feature-Engine", "percentage": 95, "css_class": "bar-color-2"},
            {"name": "NumPy", "percentage": 95, "css_class": "bar-color-3"},
            {"name": "SciPy", "percentage": 95, "css_class": "bar-color-1"},
            {"name": "Matplotlib", "percentage": 95, "css_class": "bar-color-2"},
            {"name": "Seaborn", "percentage": 95, "css_class": "bar-color-3"},
            {"name": "Plotly", "percentage": 95, "css_class": "bar-color-1"},
            {"name": "Pingouin", "percentage": 95, "css_class": "bar-color-2"},
            {"name": "Streamlit", "percentage": 85, "css_class": "bar-color-3"},
        ],
        "frameworks": [
            {"name": "React", "percentage": 75, "css_class": "bar-color-1"},
            {"name": "Django", "percentage": 85, "css_class": "bar-color-2"},
            {"name": "Flask", "percentage": 65, "css_class": "bar-color-3"},
        ],
        "databases": [
            {"name": "MySQL", "percentage": 65, "css_class": "bar-color-1"},
            {"name": "PostgreSQL", "percentage": 65, "css_class": "bar-color-2"},
            {"name": "MongoDB", "percentage": 85, "css_class": "bar-color-3"},
            {"name": "Psycopg2", "percentage": 75, "css_class": "bar-color-1"},
            {"name": "SQLAlchemy", "percentage": 65, "css_class": "bar-color-2"},
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
    read_readme = request.GET.get('read_readme', 'false').lower() == 'true'
    
    if read_readme and project.project_readme:
        project_readme_html = markdown(project.project_readme)
    else:
        project_readme_html = None
    # Pass the project and readme HTML to the template
    return render(request, 'main/project_detail.html', {
        'project': project,
        'read_readme': read_readme,
        'project_readme_html': project_readme_html,
        })