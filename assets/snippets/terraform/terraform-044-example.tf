output "example" {
  value = merge(
    { team = "app", env = "dev" },
    { team = "platform" }
  )
}
