provider "aws" {
  access_key = var.ACCESS_KEY
  secret_key = var.SECRET_KEY
  region = "ap-south-1"
}

resource "aws_instance" "firstInstance"{
  ami = "ami-0f2e255ec956ade7f"
  instance_type="t2.micro"
}

output "ip"{
  value = aws_instance.firstInstance.public_ip
}

variable "ACCESS_KEY"{
}

variable "SECRET_KEY"{}