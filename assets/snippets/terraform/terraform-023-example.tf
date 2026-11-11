resource "terraform_data" "service" {
  for_each = toset(["api", "worker"])
  input    = each.key
  # Do not also add count to this block.
}
