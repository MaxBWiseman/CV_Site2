from django.urls import path
from .views import HomeView, ResumeView, ContactView

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("contact", ContactView.as_view(), name="contact"),
    path("resume", ResumeView.as_view(), name="resume"),
]

# dont add a "/" of the path as it will associate it with other paths. To have a unique path, dont include "/"