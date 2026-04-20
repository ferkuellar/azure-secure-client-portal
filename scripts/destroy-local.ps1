$ErrorActionPreference = "Continue"

Write-Host "Deleting Kubernetes namespace..." -ForegroundColor Cyan
kubectl delete namespace client-portal --ignore-not-found=true

Write-Host "Deleting kind cluster..." -ForegroundColor Cyan
kind delete cluster --name client-portal-cluster

Write-Host "Removing local Docker container..." -ForegroundColor Cyan
docker rm -f client-portal-api

Write-Host "Local cleanup complete." -ForegroundColor Green