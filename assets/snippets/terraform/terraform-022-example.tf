resource "terraform_data" "source" {
  input = "example"
}
resource "terraform_data" "consumer" {
  for_each = { api = terraform_data.source.id }
  input    = each.value
}
