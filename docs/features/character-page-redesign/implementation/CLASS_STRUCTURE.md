# Client Structure

Since this is a vanilla JS frontend, "Classes" are represented by ES Modules or global objects if using simple script tags. We will use a dedicated `auth.js` file.

## 1. `client/auth.js`

This file encapsulates all MSAL interaction.

```javascript
const msalConfig = { ... };
const myMSALObj = new msal.PublicClientApplication(msalConfig);

/**
 * Initiates the login flow.
 * Redirects to Microsoft Identity Platform.
 */
async function signIn() { ... }

/**
 * Handles the return from the login redirect.
 * @returns {Promise<AccountInfo|null>} The logged-in account or null.
 */
async function handleRedirect() { ... }

/**
 * Acquires an access token for the API.
 * Attempts silent acquisition first, falls back to popup if interaction required.
 * @returns {Promise<string|null>} The access token.
 */
async function getToken() { ... }

/**
 * Signs the user out.
 */
function signOut() { ... }

/**
 * Checks if a user is currently signed in.
 * @returns {AccountInfo|null}
 */
function getAccount() { ... }
```

## 2. `client/character/index.html` (Script Section)

The script embedded here will act as the controller for the character page.

```javascript
// Pseudo-code flow
import { handleRedirect, getAccount, getToken } from '../auth.js'; // Or global window.auth if not using modules

async function init() {
    // 1. Handle potential redirect (if redirectUri was set to this page)
    await handleRedirect();

    // 2. Check Auth
    const user = getAccount();
    if (!user) {
        window.location.href = "/";
        return;
    }

    // 3. Update UI
    renderUser(user);

    // 4. Fetch Data
    const token = await getToken();
    const data = await fetchApi(token);
    renderData(data);
}
```
