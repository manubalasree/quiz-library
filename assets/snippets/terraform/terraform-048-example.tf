resource "terraform_data" "network" {
  input = "network-config"
}
resource "terraform_data" "app" {
  input = terraform_data.network.output
}
