from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Environment, Instance

@receiver(post_save, sender=Environment)
def create_instance_profile(sender, instance, created, **kwargs):
    if created:
        # Map plan types to hardware specs (Bonus: UX Thinking)
        specs = {'Starter': {'cpu': '1 vCPU', 'ram': '1GB'}, 
                 'Pro': {'cpu': '2 vCPU', 'ram': '4GB'}}
        
        plan = specs.get(instance.plan_type, specs['Starter'])
        
        Instance.objects.create(
            environment=instance,
            cpu=plan['cpu'],
            ram=plan['ram'],
            status='Pending' # This starts the "simulation"
        )