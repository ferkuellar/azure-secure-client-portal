$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$ApiPath = Join-Path $ProjectRoot "app\api"
$K8sPath = Join-Path $ProjectRoot "k8s"

Write-Host "Project root: $ProjectRoot" -ForegroundColor Cyan
Write-Host "API path: $ApiPath" -ForegroundColor Cyan
Write-Host "K8s path: $K8sPath" -ForegroundColor Cyan

if (-not (Test-Path $ApiPath)) {
    throw "API path not found: $ApiPath"
}

if (-not (Test-Path $K8sPath)) {
    throw "K8s path not found: $K8sPath"
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker is not installed or not in PATH."
}

if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
    throw "kubectl is not installed or not in PATH."
}

if (-not (Get-Command kind -ErrorAction SilentlyContinue)) {
    throw "kind is not installed or not in PATH. Install it with: winget install Kubernetes.kind"
}

Write-Host "Building Docker image..." -ForegroundColor Cyan
Push-Location $ApiPath
docker build -t azure-secure-client-portal-api:local .
Pop-Location

$clusterName = "client-portal-cluster"
$existingClusters = kind get clusters

if ($existingClusters -notcontains $clusterName) {
    Write-Host "Creating kind cluster..." -ForegroundColor Cyan
    kind create cluster --name $clusterName
}
else {
    Write-Host "kind cluster already exists: $clusterName" -ForegroundColor Green
}

Write-Host "Loading image into kind..." -ForegroundColor Cyan
kind load docker-image azure-secure-client-portal-api:local --name $clusterName

Write-Host "Applying Kubernetes manifests..." -ForegroundColor Cyan
kubectl apply -f (Join-Path $K8sPath "namespace.yaml")
kubectl apply -f (Join-Path $K8sPath "configmap.yaml")
kubectl apply -f (Join-Path $K8sPath "deployment.yaml")
kubectl apply -f (Join-Path $K8sPath "service.yaml")

Write-Host "Waiting for deployment rollout..." -ForegroundColor Cyan
kubectl rollout status deployment/client-api -n client-portal --timeout=180s

Write-Host "Kubernetes local deployment complete." -ForegroundColor Green
Write-Host "Run: kubectl get all -n client-portal" -ForegroundColor Yellow