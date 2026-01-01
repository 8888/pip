# User Stories

## User Story 1: Automate Azure Function Deployment with GitHub Actions

**As a** DevOps Engineer,
**I want** to automate the deployment of the `pip-tracker` Azure Function using GitHub Actions
**So that** changes pushed to the `main` branch are validated and deployed to the live environment without manual intervention.

**Acceptance Criteria:**

1.  The `build.gradle.kts` file is updated to set the Azure region to `canadacentral`.
2.  A GitHub Actions workflow file (e.g., `.github/workflows/deploy.yml`) is created.
3.  The workflow triggers automatically on pushes to the `main` branch.
4.  The workflow sets up the Java 21 environment.
5.  The workflow executes `./gradlew clean build` to compile the code and run unit tests.
6.  Upon a successful build, the workflow deploys the artifact to the `pip-tracker` Azure Function.
7.  Deployment authentication is handled securely using the `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` GitHub secret.
