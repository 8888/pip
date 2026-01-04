// client/auth.js

const msalConfig = {
    auth: {
        clientId: "5e24adce-63ed-4c99-86d3-d8b4d1dfb211",
        authority: "https://login.microsoftonline.com/04c5cb13-f93e-4b35-9779-8764f8376e26",
        redirectUri: window.location.origin, 
    },
    cache: {
        cacheLocation: "localStorage", // Persist login across tabs/refreshes
        storeAuthStateInCookie: false,
    }
};

const myMSALObj = new msal.PublicClientApplication(msalConfig);

async function initializeMSAL() {
    await myMSALObj.initialize();
    const accounts = myMSALObj.getAllAccounts();
    if (accounts.length > 0) {
        myMSALObj.setActiveAccount(accounts[0]);
    }
}

async function signIn() {
    try {
        const loginRequest = {
            scopes: ["User.Read"]
        };
        await myMSALObj.loginRedirect(loginRequest);
    } catch (error) {
        console.error("Login Error:", error);
    }
}

async function handleRedirect() {
    try {
        const response = await myMSALObj.handleRedirectPromise();
        if (response) {
            console.log("Logged in successfully");
            myMSALObj.setActiveAccount(response.account);
            return response.account;
        }
        return null;
    } catch (error) {
        console.error("Redirect Error:", error);
        return null;
    }
}

function getAccount() {
    const activeAccount = myMSALObj.getActiveAccount();
    if (activeAccount) {
        return activeAccount;
    }
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return null;
    }
    return currentAccounts[0];
}

async function getToken() {
    const account = getAccount();
    if (!account) return null;

    try {
        const response = await myMSALObj.acquireTokenSilent({
            scopes: ["5e24adce-63ed-4c99-86d3-d8b4d1dfb211/.default"], // API Scope
            account: account
        });
        return response.accessToken;
    } catch (error) {
        if (error instanceof msal.InteractionRequiredAuthError) {
             return myMSALObj.acquireTokenPopup({ 
                scopes: ["5e24adce-63ed-4c99-86d3-d8b4d1dfb211/.default"]
            });
        }
        console.error("Token Acquisition Error:", error);
        throw error;
    }
}

function signOut() {
    const currentAccount = getAccount();
    if (!currentAccount) {
        window.location.href = "/";
        return;
    }
    const logoutRequest = {
        account: myMSALObj.getAccountByHomeId(currentAccount.homeAccountId),
        postLogoutRedirectUri: window.location.origin,
    };
    myMSALObj.logoutRedirect(logoutRequest);
}
