locals {
  settings = jsondecode("{}")
}
output "example" {
  value = try(local.settings.retries, 3)
}
