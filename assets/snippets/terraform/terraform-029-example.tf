resource "terraform_data" "frontend" {
  input = "web"
}
moved {
  from = terraform_data.web
  to   = terraform_data.frontend
}
