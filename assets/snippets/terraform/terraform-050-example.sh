# backend.tf must declare: terraform { backend "s3" {} }
terraform init   -backend-config="bucket=replace-with-your-state-bucket"   -backend-config="key=practice/terraform.tfstate"   -backend-config="region=us-east-1"   -backend-config="use_lockfile=true"
