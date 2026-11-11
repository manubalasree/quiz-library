resource "terraform_data" "shared" {
  input = { owner = "external-controller" }
  lifecycle {
    ignore_changes = [input]
  }
}
