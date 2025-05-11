from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Projects(models.Model):
    slug = models.SlugField(max_length=8, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    project_banner_image = models.ImageField(upload_to='project_banner_images/')
    link = models.URLField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_images = models.ImageField(upload_to='project_images/')

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Projects"

class Skills(models.Model):
    skill_name = models.CharField(max_length=100)
    skill_level = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.skill_name
    
    class Meta:
        verbose_name_plural = "Skills"
    
class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    content = models.TextField()
    blog_banner_image = models.ImageField(upload_to='blog_banner_images/')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    blog_images = models.ImageField(upload_to='blog_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Blog Posts"
