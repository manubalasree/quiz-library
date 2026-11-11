data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]
  filter {
    name   = "tag:Application"
    values = ["quiz-demo"]
  }
}
output "image_id" {
  value = data.aws_ami.app.id
}
