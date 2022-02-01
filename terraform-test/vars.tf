variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_ACCESS_KEY" {}
variable "AWS_REGION" {
  default = "ap-south-1"
}

variable "AMIS"{
  type = map(string)
    default = {
    ap-south-1 = "ami-0851b76e8b1bce90b"
  }
}

variable "PATH_TO_PUBLIC_KEY"{
  default = "mykey.pub"
}

variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}

variable "INSTANCE_USERNAME" {
  default = "ubuntu"
}