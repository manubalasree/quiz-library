resource "terraform_data" "service" {
  for_each = toset(["api", "worker", "api"])
  input    = each.key
}
output "example" {
  value = sort(keys(terraform_data.service))
}
