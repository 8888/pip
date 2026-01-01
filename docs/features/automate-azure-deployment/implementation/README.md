# Feature: Automate Azure Function Deployment

## Purpose
To enable continuous deployment for the `pip-tracker` Azure Function, ensuring that every update to the main codebase is automatically tested and deployed.

## Implementation Details
- **CI/CD Tool:** GitHub Actions.
- **Target Environment:** Azure Functions (Linux, Java 21).
- **Region:** `canadacentral`.

## Prerequisites
- The `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` must be added to the GitHub repository secrets.
- The `pip-tracker` Function App must exist in Azure.
