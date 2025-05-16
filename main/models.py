from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Projects(models.Model):
    slug = models.SlugField(max_length=100, unique=True, blank=True, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    github_link = models.URLField(max_length=200)
    deployed_link = models.URLField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_readme = models.TextField(blank=True, null=True)
    github_raw_content_base_url = models.CharField(max_length=255, blank=True)
    
    @property
    def github_banner_image_url(self):
        """Find the first image with 'banner' in its name from the README"""
        if not self.project_readme or not self.github_raw_content_base_url:
            return None
            
        import re
        # Look for markdown image syntax with 'banner' in filename
        banner_pattern = r'!\[.*?\]\((.*?banner.*?\.(?:png|jpg|jpeg|gif|webp))\)'
        match = re.search(banner_pattern, self.project_readme, re.IGNORECASE)
        
        if match:
            image_path = match.group(1)
            # Handle relative paths
            if image_path.startswith('./'):
                return f"{self.github_raw_content_base_url}{image_path[2:]}"
            elif not (image_path.startswith('http') or image_path.startswith('/')):
                return f"{self.github_raw_content_base_url}{image_path}"
            else:
                return image_path
                
        # No banner image found, look for first image instead
        image_pattern = r'!\[.*?\]\((.*?\.(?:png|jpg|jpeg|gif|webp))\)'
        match = re.search(image_pattern, self.project_readme)
        
        if match:
            image_path = match.group(1)
            # Handle relative paths
            if image_path.startswith('./'):
                return f"{self.github_raw_content_base_url}{image_path[2:]}"
            elif not (image_path.startswith('http') or image_path.startswith('/')):
                return f"{self.github_raw_content_base_url}{image_path}"
            else:
                return image_path
        
        return None
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            unique_slug = base_slug
            counter = 1
            while Projects.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)

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
