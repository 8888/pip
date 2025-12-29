# Deployment Strategy (Manual Setup)

This guide outlines the steps to manually deploy the Habit Tracker application using the Azure Portal.

### Step 1: Deploy the Database

1.  **Create Cosmos DB Account:**
    *   Navigate to the Azure Portal and search for "Azure Cosmos DB".
    *   Click "Create" and select "Azure Cosmos DB for MongoDB".
    *   Choose the "Serverless" capacity mode.
    *   Fill in the required details (subscription, resource group, account name, location).
    *   Once deployed, navigate to the "Connection String" section and copy the **PRIMARY CONNECTION STRING**. You will need this for the next step.

### Step 2: Set Up Key Vault for Secrets

1.  **Create Key Vault:**
    *   In the Azure Portal, search for "Key Vault" and click "Create".
    *   Fill in the required details (resource group, name, region, pricing tier). The "Standard" tier is fine for this project.
2.  **Add Secret:**
    *   Once the Key Vault is deployed, navigate to the "Secrets" section and click "Generate/Import".
    *   Give the secret a name, for example, `CosmosDBConnectionString`.
    *   In the "Value" field, paste the Cosmos DB connection string you copied earlier.
    *   Click "Create".
3.  **Configure Access Policies:**
    *   Go to the "Access policies" section of your Key Vault.
    *   Click "Create" to add a new policy.
    *   Under "Secret permissions", select "Get" and "List".
    *   For the "Principal", you will select the managed identity of your Function App. You will create the Function App in the next step, so you will need to **return to this step** after it is created.

### Step 3: Deploy the Backend API

1.  **Create Function App:**
    *   In the Azure Portal, search for "Function App" and click "Create".
    *   Configure it with the "Kotlin" runtime stack on a "Consumption (Serverless)" plan.
    *   **Crucially**, under the "Identity" tab, turn the "System assigned" status **On**. This creates a managed identity for your Function App that Key Vault can grant access to.
    *   Fill in the rest of the required details and create the app.
2.  **(Return to Key Vault)** Now that the Function App exists, go back to your Key Vault's "Access policies", find the policy you started creating, and select the name of your Function App as the principal. Save the access policy.
3.  **Configure Application Settings:**
    *   In the Function App's "Configuration" section, add a new Application Setting named `CosmosDBConnectionString`.
    *   For the value, you will use a Key Vault reference, not the actual string. The format is `@Microsoft.KeyVault(SecretUri=SECRET_URI)`.
    *   You can find the `SECRET_URI` by navigating to the secret in your Key Vault and clicking on the current version. The "Secret Identifier" is the URI you need.
4.  **Deploy Code:**
    *   Develop your Kotlin functions locally. Your code will read the `CosmosDBConnectionString` setting as usual, and Azure will handle resolving the Key Vault reference.
    *   Deploy your functions to the created Function App.

### Step 4: Deploy the API Gateway

1.  **Create API Management Instance:**
    *   Search for "API Management" and click "Create".
    *   Select the "Consumption" tier.
    *   Fill in the required details.
2.  **Configure the API:**
    *   Once deployed, navigate to the "APIs" section and import your Function App.
    *   Go to the "Settings" for the imported API and ensure "Subscription required" is unchecked for simplicity.
    *   Add a CORS policy to allow your Static Web App's URL.

### Step 5: Deploy the Frontend

1.  **Create Static Web App:**
    *   Search for "Static Web Apps" and click "Create".
    *   Connect it to your GitHub repository.
    *   Choose the "Custom" build preset, leave "app location" as `/`, and set `api_location` to an empty value.
2.  **Link API Management:**
    *   In the Static Web App's "APIs" section, link it to the API Management instance you created.
3.  **Configure Authentication:**
    *   In the "Authentication" section, configure your desired identity providers.
