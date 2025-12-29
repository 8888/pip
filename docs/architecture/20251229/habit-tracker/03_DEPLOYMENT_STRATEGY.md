# Deployment Strategy (Manual Setup)

This guide outlines the steps to manually deploy the Habit Tracker application using the Azure Portal.

### Step 1: Deploy the Database

1.  **Create Cosmos DB Account:**
    *   Navigate to the Azure Portal and search for "Azure Cosmos DB".
    *   Click "Create" and select "Azure Cosmos DB for MongoDB".
    *   Choose the "Serverless" capacity mode.
    *   Fill in the required details (subscription, resource group, account name, location).
    *   Once deployed, navigate to the "Connection String" section and copy the PRIMARY CONNECTION STRING. You will need this later.

### Step 2: Deploy the Backend API

1.  **Create Function App:**
    *   In the Azure Portal, search for "Function App" and click "Create".
    *   Configure it with the "Kotlin" runtime stack on a "Consumption (Serverless)" plan.
    *   Fill in the required details.
2.  **Configure Application Settings:**
    *   Once deployed, go to the Function App's "Configuration" section.
    *   Add a new Application Setting named `CosmosDBConnectionString`.
    *   Paste the connection string you copied from Cosmos DB as the value.
3.  **Deploy Code:**
    *   Develop your Kotlin functions locally. You can use the Azure Functions Core Tools and Maven/Gradle to build your project.
    *   Deploy your functions to the created Function App (e.g., using the Azure Functions extension in VS Code or IntelliJ).

### Step 3: Deploy the API Gateway

1.  **Create API Management Instance:**
    *   Search for "API Management" and click "Create".
    *   Select the "Consumption" tier.
    *   Fill in the required details. This may take some time to provision.
2.  **Configure the API:**
    *   Once deployed, navigate to the "APIs" section and add a new "Function App" based API.
    *   Select the Function App you created in Step 2.
    *   This will automatically import your functions as operations.
    *   Go to the "Settings" for the imported API and ensure the "Subscription required" checkbox is unchecked for simplicity in this hobby project.
    *   Add a CORS policy to allow your Static Web App's URL.

### Step 4: Deploy the Frontend

1.  **Create Static Web App:**
    *   Search for "Static Web Apps" and click "Create".
    *   Connect it to your GitHub repository where your HTML/JS code resides. The creation wizard will automatically set up a GitHub Action to build and deploy your site.
    *   Choose the "Custom" build preset and leave the "app location" as `/` (or wherever your `index.html` is). Set the `api_location` to an empty value since we are using API Management.
2.  **Link API Management:**
    *   In the Static Web App's "APIs" section, link it to the API Management instance you created. This will proxy all `/api` requests.
3.  **Configure Authentication:**
    *   In the "Authentication" section, you can invite users or leave it open to any authenticated user from the providers you enable (e.g., GitHub, Microsoft).
