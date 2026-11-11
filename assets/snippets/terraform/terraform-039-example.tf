variable "enabled" {
  type    = bool
  default = false
}
output "example" {
  value = var.enabled ? 1 : 0
}
