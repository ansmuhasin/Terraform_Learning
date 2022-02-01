variable "myVar" {
type = string
default = "hello world"
}

variable "myMap" {
type=map(string)
default = {myKey= "my Value"}
}

variable "myList" {
type=list
default = [1,2,3]
}