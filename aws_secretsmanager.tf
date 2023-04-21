variable "region" {
  type = string
}

provider "aws" {
  region = var.region
}

resource "aws_kms_key" "my_kms_key" {
  description = "Encryption key for my Terraform secrets"
}

resource "aws_secretsmanager_secret" "my_secret" {
  description = "My secret created with Terraform"
  name        = "my-app/tf/my-secret"
  kms_key_id  = aws_kms_key.my_kms_key.id
}

resource "aws_secretsmanager_secret_version" "my_secret_version" {
  secret_id     = aws_secretsmanager_secret.my_secret.id
  secret_string = "my-very-secret-value"
}

# For base64 encoded secrets
# resource "aws_secretsmanager_secret_version" "my_secret_version" {
#   secret_id     = aws_secretsmanager_secret.my_secret.id
#   secret_binary = base64encode("my-very-secret-value")
# }
