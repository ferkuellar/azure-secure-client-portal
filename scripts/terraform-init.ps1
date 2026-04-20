$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$TfPath = Join-Path $ProjectRoot "infra\env\dev"

Write-Host "Terraform path: $TfPath" -ForegroundColor Cyan

if (-not (Get-Command terraform -ErrorAction SilentlyContinue)) {
    throw "Terraform is not installed or not in PATH."
}

if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    throw "Azure CLI is not installed or not in PATH."
}

Push-Location $TfPath

if (-not (Test-Path ".\terraform.tfvars")) {
    Copy-Item ".\terraform.tfvars.example" ".\terraform.tfvars"
    Write-Host "terraform.tfvars created from example." -ForegroundColor Yellow
}

terraform init
terraform validate
terraform plan

Pop-Location