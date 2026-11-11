resource "aws_security_group" "web" {
  name   = "quiz-demo-web"
  vpc_id = "vpc-0123456789abcdef0"
  dynamic "ingress" {
    for_each = [80, 443]
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["10.0.0.0/16"]
    }
  }
}
