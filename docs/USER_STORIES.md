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
1.  Deployment authentication is handled securely using the `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` GitHub secret.

## User Story 2: Animate ASCII Bat Mascot

**As a** Visitor,
**I want** to see the ASCII bat mascot animated
**So that** the application feels more alive and engaging.

**Acceptance Criteria:**

1.  The existing static ASCII art in `client/index.html` is replaced with a dynamic element.
2.  A JavaScript loop cycles through at least 3 distinct ASCII frames (e.g., wings level, wings up, wings down) to create a flapping animation.
3.  The animation plays continuously on a loop.
4.  The visual style remains consistent with the current "pip" bat mascot.

## User Story 3: Enforce Restricted Authentication for Web App

**As a** Owner,
**I want** to restrict access to the Pip web application to only specifically invited users,
**So that** only authorized individuals can use the tool and view the data.

**Acceptance Criteria:**

1.  Accessing the root URL (`/`) or any sub-path without an active session blocks access or redirects the user to login.
2.  Users can authenticate using GitHub.
3.  **Only users assigned the custom role `granted` are allowed access to the site content.**
4.  The application uses the **Azure Static Web Apps Standard Plan** to support custom roles.
5.  The restriction is implemented via `staticwebapp.config.json`.

**Notes & Tradeoffs:**
- **Tier Requirement:** This feature requires the **Standard Plan**.
- **User Management:** Invitations and role assignments (assigning the `granted` role to GitHub handles) are managed manually in the Azure Portal.
- **Access Control:** Access is restricted to a curated allow-list.

