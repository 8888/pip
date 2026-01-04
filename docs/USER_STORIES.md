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

## User Story 3: Enforce Authentication for Web App

**As a** User,
**I want** to be required to log in before accessing the Pip web application,
**So that** my usage and data remain private and unauthorized users cannot access the tool.

**Acceptance Criteria:**

1.  Accessing the root URL (`/`) or any sub-path without an active session blocks access or redirects the user to login.
2.  Users can authenticate using at least one default provider (GitHub or Microsoft Entra ID).
3.  Upon successful authentication, the user is granted access to the `index.html` and associated assets.
4.  The restriction is implemented via `staticwebapp.config.json` using the built-in `authenticated` role.

**Notes & Tradeoffs:**
- **Tier Limitation:** On the Azure Static Web Apps Free Tier, custom roles are not supported.
- **Access Control:** Access is binary (authenticated or unauthenticated). No granular levels of access are implemented in this scope.
- **Future Growth:** Granular roles would require upgrading to the Standard plan.

## User Story 4: Create Character Page

**As a** user,
**I want** a dedicated `/character` page,
**So that** I can view my character's statistics and attributes in the Cryptid Console style.

**Acceptance Criteria:**

1.  A new file `client/character.html` is created.
2.  The page uses the "Cryptid Console" color palette: `#0d0208` (void) for background and `#fbe9d0` (bone) for primary text.
3.  The layout is mobile-first, stacking elements vertically by default.
4.  The page includes a character statistics section with placeholder values (e.g., Level, XP, Health).
5.  All components follow the style guide: sharp corners (0px border-radius), 2px thick borders, and hard shadows.
6.  A "Back to Home" button/link is provided, styled according to the `components.buttons` specification in the style guide.
7.  The page includes an ASCII mascot (reusing Pip) styled with the `pip` blue color (`#58a6ff`).

