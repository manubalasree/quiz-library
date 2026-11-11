variable "replicas" {
  type    = number
  default = 3
  validation {
    condition     = var.replicas > 0
    error_message = "replicas must be greater than zero."
  }
}
output "example" {
  value = var.replicas
}
