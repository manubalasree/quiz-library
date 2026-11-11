terraform {
  backend "s3" {
    bucket       = "replace-with-your-state-bucket"
    key          = "practice/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}
