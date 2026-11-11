variable "environment" {
  type    = string
  default = "dev"
}
locals {
  app_name = "quiz-${var.environment}"
}
output "example" {
  value = local.app_name
}
