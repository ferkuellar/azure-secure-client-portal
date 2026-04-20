# Azure Secure Client Portal

## Executive Summary

Azure Secure Client Portal is a portfolio project designed to demonstrate practical Azure cloud architecture skills for a Cloud Architect role. The solution uses Azure Static Web Apps for the frontend, Azure Container Apps for a containerized API, Terraform for infrastructure as code, PowerShell for automation, and Kubernetes local validation for orchestration readiness.

## Business Problem

A company needs a secure client-facing portal to expose operational information such as incidents, profile data, and service status, while keeping the initial deployment simple, low cost, and ready for future enterprise evolution.

## Solution Overview

- Frontend: React + Vite
- Backend: FastAPI
- Containerization: Docker
- Orchestration validation: Kubernetes local with kind
- Azure hosting: Static Web Apps + Container Apps
- IaC: Terraform
- Automation: PowerShell + Azure CLI
- Identity: Microsoft Entra ID / GitHub authentication in Static Web Apps

## Why this architecture

This first version intentionally avoids AKS in Azure because AKS free tier still requires paid worker nodes. The solution uses Azure Container Apps for lower operational overhead and cost efficiency, while Kubernetes concepts are validated locally.

## Key Skills Demonstrated

- Azure architecture design
- Terraform infrastructure provisioning
- PowerShell operational scripting
- Docker image build and deployment
- Kubernetes manifests and troubleshooting
- Identity and security fundamentals
- Cost-aware architecture decision making

## Repository Structure

See project folders under `app`, `infra`, `k8s`, `scripts`, and `docs`.

## Current Status

Phase 0 and Phase 1 in progress:

- [X] Project definition
- [X] Backend API scaffold
- [X] Frontend scaffold
- [ ] Docker packaging
- [ ] Kubernetes local deployment
- [ ] Terraform Azure deployment
- [ ] Identity integration
- [ ] CI/CD pipeline
