resource "terraform_data" "environment" {
  for_each = { dev = 1, prod = 3 }
  input    = each.value
}
output "example" {
  value = terraform_data.environment["prod"].input
}
