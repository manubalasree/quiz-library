variable "demo_token" {
  type      = string
  sensitive = true
  default   = "dummy-not-a-real-token"
}
resource "terraform_data" "demo" {
  input = var.demo_token
}
