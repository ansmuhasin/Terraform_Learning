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


//! Lost the topics 😥

//! provisioning on windows
//+ add a new ami for wwindows.
//+ need extra parameter user_data
//* user_data     = <<EOF
//* <powershell>
//* net user ${var.INSTANCE_USERNAME} '${var.INSTANCE_PASSWORD}' /add /y
//* net localgroup administrators ${var.INSTANCE_USERNAME} /add
//*
//* winrm quickconfig -q
//* winrm set winrm/config/winrs '@{MaxMemoryPerShellMB="300"}'
//* winrm set winrm/config '@{MaxTimeoutms="1800000"}'
//* winrm set winrm/config/service '@{AllowUnencrypted="true"}'
//* winrm set winrm/config/service/auth '@{Basic="true"}'
//*
//* netsh advfirewall firewall add rule name="WinRM 5985" protocol=TCP dir=in localport=5985 action=allow
//* netsh advfirewall firewall add rule name="WinRM 5986" protocol=TCP dir=in localport=5986 action=allow
//*
//* net stop winrm
//* sc.exe config winrm start=auto
//* net start winrm
//* </powershell>
//* EOF

//+ we are adding a powershell script. and adding a user and password. and adding to admin group
//+ and we are configuring winrm, use to upload and execute the files
//+ and we are allowing the port. stop winrm and start winrm
//+ connection type is winrm. and user is the user we created and the password
//+ mention the proper file name and destination. remove the provition execute

//+ apply the changes. this will create the instance. and we can login to it using remote desctop
//+ we can connect as admin password with extra steps needed. watch vid


//! Output
//+ we can return or output the results
output "ip"{
  value = aws_instance.firstInstance.public_ip
}

//! Terraform state.
//+ first we need to configure aws in the cli.
//+ we can run aws configure
//+ we can see the credentials at cat ~/.aws/credentials   . thats where amazon stores the data
//+ we need to create a backed file. and then configure the backend
terraform {
  backend "s3" {
    bucket = "terraform-state-d65d"
    key="terraform/demo"
  }
}
//+ terraform init. might ask region if we dont give

//! DataSources
//+ we can add the data and it will be available for use
data "aws_ip_ranges" "european_ec2" {
  regions  = ["eu-west-1", "eu-central-1"]
  services = ["ec2"]
}
//+ we can use it like this
data.aws_ip_ranges.european_ec2.cidr_blocks

//! Template providers
