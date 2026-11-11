resource "aws_instance" "web" {
  for_each      = toset(["api", "worker"])
  ami           = "ami-0123456789abcdef0"
  instance_type = "t3.micro"
}
output "instance_ids" {
  value = [for item in aws_instance.web : item.id]
}
