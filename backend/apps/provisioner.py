import boto3
import time
from .models import DeploymentLog

def provision_ec2(instance_obj, aws_access_key, aws_secret_key):
    """
    Logic to talk to AWS and start a server.
    """
    USE_MOCK = True
    if not aws_access_key or aws_access_key == "YOUR_ACCESS_KEY":
        DeploymentLog.objects.create(instance=instance_obj, message="[MOCK MODE] Validating credentials...")
        time.sleep(1) # Simulate network delay
        DeploymentLog.objects.create(instance=instance_obj, message="[MOCK MODE] AWS Instance i-mock12345 created successfully.")
        instance_obj.instance_id = "i-mock12345"
        instance_obj.status = "Deploying"
        instance_obj.save()
        return
    # --- ADD THIS MAPPING HERE ---
    REGION_MAP = {
        'United States - Michigan': 'us-east-2',
        'Asia Pacific - Mumbai': 'ap-south-1',
    }
    
    # Translate the UI name to a technical AWS region code
    # If the name isn't in the map, it defaults to us-east-1
    aws_region_code = REGION_MAP.get(instance_obj.environment.region, 'us-east-1')

    try:
        # 1. Initialize the AWS Client using the NEW aws_region_code
        ec2 = boto3.client(
            'ec2',
            region_name=aws_region_code, # Use the translated code here
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key
        )

        # 2. Log the start
        DeploymentLog.objects.create(instance=instance_obj, message=f"Starting AWS Provisioning in {aws_region_code}...")

        # 3. Create the instance
        instance_type = 't2.micro' if instance_obj.environment.plan_type == 'Starter' else 't3.medium'
        
        # Note: ImageId 'ami-0c55b159cbfafe1f0' is specific to us-east-2. 
        # For a production app, you'd map AMIs to regions too!
        response = ec2.run_instances(
            ImageId='ami-0c55b159cbfafe1f0', 
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