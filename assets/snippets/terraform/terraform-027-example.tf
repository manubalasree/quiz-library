resource "terraform_data" "important" {
  input = "keep-me"
  lifecycle {
    prevent_destroy = true
  }
}
