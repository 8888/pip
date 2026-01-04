# Design: Character Page and Landing Page Redesign

## 1. Architecture

The application remains a static frontend (Azure Static Web Apps) talking to a serverless backend (Azure Functions).

### 1.1 Authentication (MSAL.js)
We will migrate from the inline script in `index.html` to a modular `auth.js` file to be shared across pages.
-   **Library:** `msal-browser.min.js` (via CDN).
-   **Config:**
    -   ClientId: `5e24adce-63ed-4c99-86d3-d8b4d1dfb211`
    -   TenantId: `04c5cb13-f93e-4b35-9779-8764f8376e26`
    -   RedirectUri: Window origin (dynamic).
-   **Flow:**
    1.  User clicks "Login" on Landing Page -> `auth.signIn()`.
    2.  MSAL redirects to Microsoft login.
    3.  User returns to Landing Page (default redirect).
    4.  `auth.handleRedirect()` processes the token.
    5.  If successful, script redirects user to `/character`.
    6.  `/character` page checks for active account on load. If none, redirects back to `/`.

### 1.2 Styling ("Cryptid Console")
We will strictly follow the `styleguide.html` reference.
-   **Framework:** Tailwind CSS (CDN).
-   **Config:** Injected via `<script>` tag in `<head>` (consistent with reference).
-   **Theme Colors:** Void, Crypt, Radical, Toxic, Spirit, Gloom, Pip.
-   **Fonts:** VT323 (Headers), Space Mono (Body).

## 2. Page Specifics

### 2.1 Landing Page (`client/index.html`)
-   **Layout:** Hero section with "Pip" ASCII mascot.
-   **Action:** "Login" button (styled as `[ LOGIN ]` or similar per styleguide).
-   **Removal:** Remove the "Test API Call" button and logic.

### 2.2 Character Page (`client/character/index.html`)
-   **Access:** Protected.
-   **Layout:**
    -   **Nav:** Top bar with "FinnMinn.exe" branding and "Logout" button.
    -   **Main:** Container for API interaction.
-   **Functionality:**
    -   On load: `auth.getToken()` -> `fetch(API)`.
    -   Display result in a styled "Terminal" window (using `pre` tag and "Crypt" colors).

## 3. Directory Structure Changes

```text
client/
├── auth.js                 <-- NEW: Shared MSAL logic
├── index.html              <-- UPDATED: Styles + Login only
├── character/              <-- NEW: Secured Area
│   └── index.html          <-- NEW: Character Dashboard
├── mascot.js               <-- EXISTING: Animated Mascot
└── ...
```
