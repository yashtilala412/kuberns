from django.db import models
import uuid
# Create your models here.

class WebApp(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255) # App Name from Figma
    repo_url = models.URLField() # GitHub Repo
    owner = models.CharField(max_length=255) # GitHub Org/User
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Environment(models.Model):
    webapp = models.ForeignKey(WebApp, related_name='environments', on_delete=models.CASCADE)
    branch = models.CharField(max_length=100, default='main')
    region = models.CharField(max_length=50) # e.g., us-east-1
    framework = models.CharField(max_length=50) # React, Vue, etc.
    plan_type = models.CharField(max_length=20) # Starter, Pro
    port = models.IntegerField(default=3000)
    
    def __str__(self):
        return f"{self.webapp.name} - {self.branch}"

class EnvVariable(models.Model):
    environment = models.ForeignKey(Environment, related_name='variables', on_delete=models.CASCADE)
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

class Instance(models.Model):
    environment = models.OneToOneField(Environment, on_delete=models.CASCADE)
    instance_id = models.CharField(max_length=100, blank=True, null=True) # AWS Instance ID
    public_ip = models.GenericIPAddressField(blank=True, null=True)
    status = models.CharField(max_length=50, default='Pending') # Pending, Running, Terminated
    cpu = models.CharField(max_length=50)
    ram = models.CharField(max_length=50)