# Requires a matching aws_s3_bucket.logs resource configuration.
terraform import aws_s3_bucket.logs existing-demo-logs-bucket
terraform plan
