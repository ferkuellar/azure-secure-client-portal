$ErrorActionPreference = "Continue"

Write-Host "Validating Docker API..." -ForegroundColor Cyan

try {
    $health = Invoke-RestMethod http://localhost:8000/health
    Write-Host "[OK] Docker API health: $($health.status)" -ForegroundColor Green
}
catch {
    Write-Host "[WARN] Docker API health check failed." -ForegroundColor Yellow
}

Write-Host "Validating Kubernetes resources..." -ForegroundColor Cyan
kubectl get all -n client-portal