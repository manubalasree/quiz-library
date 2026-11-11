variable "description" {
  type     = string
  default  = null
  nullable = true
}
output "example" {
  value = var.description == null ? "not supplied" : var.description
}
