import boto3
import time
from .models import DeploymentLog

def provision_ec2(instance_obj, aws_access_key, aws_secret_key):
    """
    Logic to talk to AWS and start a server.
    """
    try:
        # 1. Initialize the AWS Client
        ec2 = boto3.client(
            'ec2',
            region_name=instance_obj.environment.region,
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key
        )

        # 2. Log the start
        DeploymentLog.objects.create(instance=instance_obj, message="Starting AWS Provisioning...")

        # 3. Create the instance (This is the core requirement)
        # Mapping our 'Starter'/'Pro' to real AWS types
        instance_type = 't2.micro' if instance_obj.environment.plan_type == 'Starter' else 't3.medium'
        
        # This is where the magic happens
        response = ec2.run_instances(
            ImageId='ami-0c55b159cbfafe1f0', # Standard Ubuntu AMI (varies by region)
            InstanceType=instance_type,
            MinCount=1,
            MaxCount=1,
        )

        aws_id = response['Instances'][0]['InstanceId']
        instance_obj.instance_id = aws_id
        instance_obj.status = 'Deploying'
        instance_obj.save()

        DeploymentLog.objects.create(instance=instance_obj, message=f"EC2 Instance {aws_id} created. Waiting for IP...")

    except Exception as e:
        instance_obj.status = 'Failed'
        instance_obj.save()
        DeploymentLog.objects.create(instance=instance_obj, message=f"Error: {str(e)}")