# Enforce Web App Authentication

## Overview
This feature secures the Pip habit tracker frontend by requiring users to be authenticated before they can access any site content. It leverages Azure Static Web Apps' built-in authentication and authorization system.

## Goals
- Prevent unauthenticated access to `index.html` and other frontend assets.
- Use standard, third-party identity providers (GitHub, Microsoft Entra ID).
- Implement security using the most cost-effective and simple method available on the Free Tier.
