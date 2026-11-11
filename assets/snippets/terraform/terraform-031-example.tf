resource "aws_s3_bucket" "logs" {
  bucket = "existing-demo-logs-bucket"
}
import {
  to = aws_s3_bucket.logs
  id = "existing-demo-logs-bucket"
}
