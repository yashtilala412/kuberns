from django.contrib import admin
from .models import WebApp, Environment, EnvVariable, Instance, DeploymentLog

admin.site.register(WebApp)
admin.site.register(Environment)
admin.site.register(Instance)
admin.site.register(DeploymentLog)