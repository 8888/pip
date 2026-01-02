# Structure: Enforce Web App Authentication

## Configuration

### `staticwebapp.config.json`
This file controls the behavior of the Azure Static Web App runtime.

#### Key Sections:
- `routes`: An array of route objects defining access rules.
- `responseOverrides`: Custom responses for specific HTTP status codes (e.g., redirecting 401 to login).
- `navigationFallback`: (Optional) Configures how to handle SPA routing, ensuring it doesn't bypass auth.

#### Route Definition:
- `route`: `/*`
- `allowedRoles`: `["granted"]`

## File Organization
- `staticwebapp.config.json`: New configuration file in the project root.
- `docs/features/enforce-web-app-auth/`: Feature documentation.
