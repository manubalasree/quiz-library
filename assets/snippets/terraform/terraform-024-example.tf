resource "aws_subnet" "app" {
  vpc_id     = "vpc-0123456789abcdef0"
  cidr_block = "10.0.1.0/24"
}
resource "aws_instance" "web" {
  ami           = "ami-0123456789abcdef0"
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.app.id
}
