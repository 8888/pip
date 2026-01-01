# Design: Automate Azure Function Deployment

## Overview
This feature implements a CI/CD pipeline using GitHub Actions to automate the build, test, and deployment of the "Pip" Kotlin Azure Function.

## Components

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- **Trigger:** `push` events to the `main` branch.
- **Jobs:**
    - `build-and-deploy`:
        - **Runner:** `ubuntu-latest`.
        - **Steps:**
            1. Checkout code.
            2. Setup Java 21 (Temurin).
            3. Setup Gradle cache to speed up builds.
            4. Execute `./gradlew clean build` to run tests and package the application.
            5. Deploy to Azure Functions using `azure/functions-action`.
- **Secrets:**
    - `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`: Stores the XML publish profile for the `pip-tracker` app.

### 2. Gradle Configuration Update (`build.gradle.kts`)
- Update `azurefunctions.region` from `westus` to `canadacentral` to align with the deployed infrastructure.

## Security Considerations
- Authentication is handled via a Publish Profile stored as a GitHub Repository Secret.
- The workflow only triggers on `main` to ensure only reviewed and merged code reaches production.

## Deployment Process
1. Developer merges code into `main`.
2. GitHub Actions detects the push.
3. Build job runs:
    - Code is compiled.
    - Unit tests (`FunctionAppTest.kt`) are executed.
    - If successful, a deployment artifact is created.
4. Deploy job runs:
    - Uses the publish profile to push the artifact to Azure.
