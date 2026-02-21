from django.db.models.signals import post_save
from django.dispatch import receiver
import threading
from django.db import transaction
from .models import Environment, Instance
from .provisioner import provision_ec2

@receiver(post_save, sender=Environment)
def handle_new_environment(sender, instance, created, **kwargs):
    if created:
        # 1. First, define the hardware specs based on the Plan Type
        specs = {
            'Starter': {'cpu': '1 vCPU', 'ram': '1GB'}, 
            'Pro': {'cpu': '2 vCPU', 'ram': '4GB'}
        }
        plan = specs.get(instance.plan_type, specs['Starter'])
        
        # 2. Create the Instance record in our database
        new_instance = Instance.objects.create(
            environment=instance,
            cpu=plan['cpu'],
            ram=plan['ram'],
            status='Pending'
        )

        # 3. Start the "Cloud Provisioning" in a background thread
        # We pass the new_instance we just created to the provisioner
        t = threading.Thread(
            target=provision_ec2, 
            args=(new_instance, 'MOCK_KEY', 'MOCK_SECRET')
        )
        t.start()