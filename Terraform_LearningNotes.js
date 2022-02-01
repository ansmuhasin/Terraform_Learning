//! Terraform
//+ Install the terraform first.download.No need to install anything.just extract to a folder and then open the folder in cmd.
//+ run the command terraform - help for checking if it is installed or not and to check the help commands
//+ if we want to make the terraform available in all thge path.then we need to set the path
//! Terraform HCL
//+ create a folder inside for test
//+ terraform will intrepret.tf files in the directory
//+ we need to create a tf file.main.tf for now and create a variable

//! Variable
//* variable "myVar" {
//*   type = string
//*   default = "hello world"
//* }

//+ terraform console command will get in to the console and can be get out of it by exit command.
//+ var.myVar will show the var default value now. "${var.myVar}" will also work
//+ we can add another
//* variable "myMap" {
//*   type=map(string)
//*   default = {myKey= "my Value"}
//* }

//+ and access it by var.myMap and can access the key by var.myMap["myKey"]

//* variable "myMap" {
//*   type=list
//*   default = [1,2,3]
//* }
//* var.myList[0]
//+ we can do operations like slice(var.myList, 1, 2)
//+
//+ we can create a resourse.tf.we need to specify provider.
//+ we can mention the provider and then the resorce and then name.also ami and instance_type
//+ ami is the imageid depends on the region

//* provider "aws"{
//* }
//*
//* variable "AWS_REGION"{
//*   type: string
//* }

//* resource "aws_instance" "example" {
//*   ami = var.AMIS[var.AWS_REGION]
//*   instance_type = "t2.micro"
//* }

//+ we can create terraform.tfvars and the assign the variable (optional can be done in other ways as well)
AWS_REGION = "ap-south-1";
//+ we need toinitialize the pluggins before we run console command. so we need to run init
//+ it automatically create terraform.tlstate/ which is a file
//+ AMIS is a variable that we can create

//* variable "AMIS"{
//*   type = map(string)
//*   default = {ap-south-1 = "my ami"}
//* }

//* var.AMIS[var.AWS_REGION]
//! Spinning the first EC2 instance.
//+ we need to mention the provider with access key and location
//* provider "aws"{
//*   access_key = ""
//*   secret_key = ""
//*   region="ap-south-1"
//* }
resource "aws_instance" "firstInstance"{
  ami = "ami-0f2e255ec956ade7f"
  instance_type="t2.micro"
}
//+ we can find the AMI online
//+ run terraform init first
//+ then we can run terraform apply, it will ask to confirm all the actions
//+ type yes to confirm. then it will create the resourse abd shhow the message
