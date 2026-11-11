variable "env" {
  type    = string
  default = "test"
}
output "example" {
  value = lookup({ dev = 1, prod = 3 }, var.env, 1)
}
