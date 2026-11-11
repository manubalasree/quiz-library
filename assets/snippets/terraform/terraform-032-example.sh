# Changes state; does not delete the remote bucket.
terraform state rm aws_s3_bucket.logs
terraform plan
