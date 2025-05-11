from django.contrib import admin
from .models import Projects, Skills, BlogPost

# Register your models here.

admin.site.register(Projects)
admin.site.register(Skills)
admin.site.register(BlogPost)
