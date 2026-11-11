variable "demo_token" {
  type      = string
  sensitive = true
  default   = "dummy-not-a-real-token"
}
output "token" {
  value     = var.demo_token
  sensitive = true
}
