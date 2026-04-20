# Architecture Overview

## Purpose

Azure Secure Client Portal is a low-cost, cloud-ready portfolio project designed to demonstrate practical Azure Cloud Architect capabilities.

## Core Components

- Azure Static Web Apps for frontend hosting
- Azure Container Apps for API hosting
- Microsoft Entra ID or GitHub authentication
- Terraform for infrastructure provisioning
- PowerShell for automation
- Docker for container packaging
- Kubernetes local for orchestration validation

## Architectural Rationale

The first version avoids AKS in Azure because AKS free tier still requires paid nodes. Azure Container Apps is more appropriate for a portfolio project that must remain low cost while still demonstrating cloud-native design.

## Security Model

- No secrets embedded in code
- Authentication delegated to supported identity provider
- HTTPS-first architecture
- Future-ready path to managed identities and Key Vault

## Future Evolution

- AKS for enterprise-grade orchestration
- Key Vault
- private networking
- database integration
- advanced observability
