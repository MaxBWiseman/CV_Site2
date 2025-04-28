from django.urls import path
from .views import HomeView, ResumeView

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("resume/", ResumeView.as_view(), name="resume")
]