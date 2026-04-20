$ErrorActionPreference = "Stop"

Write-Host "Validating local tooling..." -ForegroundColor Cyan

$tools = @(
    "python",
    "npm",
    "docker",
    "kubectl",
    "terraform",
    "az"
)

foreach ($tool in $tools) {
    if (Get-Command $tool -ErrorAction SilentlyContinue) {
        Write-Host "[OK] $tool found" -ForegroundColor Green
    }
    else {
        Write-Host "[MISSING] $tool not found" -ForegroundColor Yellow
    }
}

if (Get-Command kind -ErrorAction SilentlyContinue) {
    Write-Host "[OK] kind found" -ForegroundColor Green
}
else {
    Write-Host "[MISSING] kind not found" -ForegroundColor Yellow
    Write-Host "Install with: winget install Kubernetes.kind" -ForegroundColor Yellow
}

Write-Host "Validation complete." -ForegroundColor Cyan