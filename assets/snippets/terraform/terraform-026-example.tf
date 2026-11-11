resource "terraform_data" "release" {
  input            = "v2"
  triggers_replace = ["v2"]
  lifecycle {
    create_before_destroy = true
  }
}
