terraform plan -refresh-only -out=refresh.tfplan
terraform show refresh.tfplan
# Records the reviewed observed state and output changes.
terraform apply refresh.tfplan
