# Character Page and Landing Page Redesign

## Overview
This feature implements a redesign of the landing page and creates a new secured `/character` page for the Pip application. It aligns the visual identity with the "Cryptid Console" design system and enforces authentication using MSAL.js.

## Goals
1.  **Secure Access:** Ensure only authenticated users can access the character dashboard.
2.  **Visual Consistency:** Adopt the "Cryptid Console" aesthetic (Tailwind, Fonts, Colors).
3.  **Improved UX:** Clear login flow and separation of public (landing) vs. private (character) content.

## User Story
[User Story 4: Character Page and Landing Page Redesign](../../../USER_STORIES.md#user-story-4-character-page-and-landing-page-redesign)

## Behavior

### Authentication State
The application uses MSAL.js with `localStorage` to persist user sessions.

1.  **Landing Page (`/`):**
    *   Always displays `[ LOGIN ]` button.
    *   Clicking `[ LOGIN ]` navigates to `/character`.
    *   If a user returns to this page after a successful Microsoft Login (redirect callback), they are automatically forwarded to `/character`.

2.  **Character Page (`/character`):**
    *   **Initialization:** Clears any pending interaction status (`handleRedirect`).
    *   **Not Logged In:** Immediately initiates the MSAL `loginRedirect` flow, sending the user to the Microsoft Sign-in page.
    *   **Logged In:** Validates the session, acquires a token, and fetches/displays the API data.

### Navigation Flow
*   User -> Landing Page -> Click `[ LOGIN ]` -> `/character` -> Detects No Auth -> Microsoft Auth -> Landing Page (Redirect Callback) -> `/character` (Logged In).
*   User -> `/character` -> Click `[ LOGOUT ]` -> MSAL Logout -> Redirect to Landing Page.
