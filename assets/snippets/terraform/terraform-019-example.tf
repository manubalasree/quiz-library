resource "terraform_data" "worker" {
  count = 3
  input = "worker-${count.index}"
}
output "example" {
  value = [for worker in terraform_data.worker : worker.input]
}
