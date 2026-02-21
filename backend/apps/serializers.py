from rest_framework import serializers
from .models import WebApp, Environment, EnvVariable, Instance

class EnvVariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvVariable
        fields = ['key', 'value']

class EnvironmentSerializer(serializers.ModelSerializer):
    # This allows nesting variables inside the environment JSON
    variables = EnvVariableSerializer(many=True)

    class Meta:
        model = Environment
        fields = ['branch', 'region', 'framework', 'plan_type', 'port', 'variables']

class WebAppSerializer(serializers.ModelSerializer):
    environments = EnvironmentSerializer(many=True)

    class Meta:
        model = WebApp
        fields = ['id', 'name', 'repo_url', 'owner', 'environments']

    def create(self, validated_data):
        # Logic to save nested data (WebApp -> Env -> Vars)
        # This keeps your code DRY and modular
        env_data = validated_data.pop('environments')
        webapp = WebApp.objects.create(**validated_data)
        for env in env_data:
            vars_data = env.pop('variables')
            environment = Environment.objects.create(webapp=webapp, **env)
            for var in vars_data:
                EnvVariable.objects.create(environment=environment, **var)
        return webapp