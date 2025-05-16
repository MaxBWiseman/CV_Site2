from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Projects, Skills, BlogPost

# Register your models here.

class ProjectsAdmin(SummernoteModelAdmin):
    summernote_fields = ('description')
    exclude = ('images', 'project_banner_image')

admin.site.register(Projects, ProjectsAdmin)
admin.site.register(Skills)
admin.site.register(BlogPost)
