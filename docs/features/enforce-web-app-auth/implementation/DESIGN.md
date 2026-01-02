# Design: Enforce Web App Authentication

## Technical Approach

### 1. Global Route Protection
We will use a `staticwebapp.config.json` file located in the `client/` directory.

The core logic involves defining a route rule:
- **Route:** `/*` (matches everything)
- **Allowed Roles:** `["granted"]`

By using a custom role instead of the built-in `authenticated` role, we ensure that only users explicitly invited and assigned this role in the Azure Portal can access the site.

### 2. Authentication Flow
- When an unauthenticated user attempts to access the site, they are redirected to the GitHub login endpoint (`/.auth/login/github`).
- After login, if the user does **not** have the `granted` role, they will receive a 403 Forbidden response (or can be redirected to a "Access Denied" page if configured).

### 3. Identity Providers
- Primary Provider: GitHub.

## Tradeoffs & Constraints
- **Tier Requirement:** This implementation requires the **Azure Static Web Apps Standard Plan**.
- **Manual Management:** Authorized users must be manually invited via the Azure Portal -> Role Management tab.
- **Role Name:** We are using the role name `granted` as the standard identifier for authorized users.

