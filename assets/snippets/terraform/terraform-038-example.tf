output "example" {
  value = [for name in ["api", "worker"] : upper(name)]
}
