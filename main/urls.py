from django.urls import path
from . import views

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("resume", views.ResumeView.as_view(), name="resume"),
    path("contact", views.ContactView.as_view(), name="contact"),
    path("portfolio", views.PortfolioView.as_view(), name="portfolio"),
    path("github", views.GithubView.as_view(), name="github"),
    path("project_detail/<slug:slug>/", views.project_detail,
         name="project_detail")
]

# dont add a "/" of the path as it will associate it with other paths. To have
# a unique path, dont include "/"