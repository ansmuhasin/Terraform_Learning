provider "aws" {
  access_key = ""
  secret_key = ""
  region = "ap-south-1"
}

resource "aws_instance" "firstInstance"{
  ami = "ami-0f2e255ec956ade7f"
  instance_type="t2.micro"
}