resource "terraform_data" "service_ready" {
  input = "readiness-marker"
}
resource "terraform_data" "consumer" {
  input      = "no attribute reference to the marker"
  depends_on = [terraform_data.service_ready]
}
