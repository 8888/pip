# Design: Enforce Web App Authentication

## Technical Approach

### 1. Global Route Protection
We will use a `staticwebapp.config.json` file located in the root of the deployment artifact (or project root depending on build configuration). 

The core logic involves defining a route rule:
- **Route:** `/*` (matches everything)
- **Allowed Roles:** `["authenticated"]`

### 2. Authentication Flow
- When an unauthenticated user attempts to access the site, the system will identify they lack the `authenticated` role.
- We will configure a response override for `401` errors to redirect users to the GitHub login endpoint (`/.auth/login/github`) by default, or provide a simple login selection if preferred. For simplicity, we will start with a redirect or a 401 that triggers the SWA login prompt.

### 3. Identity Providers
Azure Static Web Apps (Free Tier) provides built-in support for:
- GitHub
- Microsoft Entra ID (formerly Azure AD)

## Tradeoffs & Constraints
- **Binary Access Control:** Due to Free Tier limitations, we are using the system-defined `authenticated` role. We cannot define custom roles (e.g., `admin`, `premium_user`). Access is currently binary: you are either logged in and have full access, or you are logged out and have no access.
- **Plan Upgrade:** Implementing granular permissions or custom roles would require upgrading the Azure Static Web App to the **Standard** plan.
- **Provider Choice:** While we can enable multiple providers, we will focus on GitHub as the primary provider for this implementation.
