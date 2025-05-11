from django.urls import path
from .views import HomeView, ResumeView, ContactView, PortfolioView, GithubView

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("resume", ResumeView.as_view(), name="resume"),
    path("contact", ContactView.as_view(), name="contact"),
    path("portfolio", PortfolioView.as_view(), name="portfolio"),
    path("github", GithubView.as_view(), name="github"),
]

# dont add a "/" of the path as it will associate it with other paths. To have
# a unique path, dont include "/"