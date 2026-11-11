provider "aws" {
  alias  = "west"
  region = "us-west-2"
}
module "network" {
  source    = "./modules/aws-info"
  providers = { aws = aws.west }
}
