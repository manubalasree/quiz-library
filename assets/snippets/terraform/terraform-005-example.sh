terraform plan -out=reviewed.tfplan
terraform show reviewed.tfplan
# Applying this file performs the reviewed infrastructure changes.
terraform apply reviewed.tfplan
