# Component Deep Dive

This document provides details on each component of the architecture.

## 1. Azure Static Web App

*   **Role:** Frontend hosting and user authentication.
*   **Configuration:**
    *   **Tier:** Free tier is sufficient.
    *   **Content:** Will serve the `index.html`, JavaScript files, and any CSS.
    *   **Authentication:** Configure the built-in authentication with a provider of your choice (e.g., GitHub, Microsoft, Google). This is done in the Azure Portal under the "Authentication" section of the Static Web App.
    *   **API Integration:** The Static Web App will be linked to the Azure API Management instance. All requests to `/api/*` will be proxied to API Management.

## 2. Azure API Management (APIM)

*   **Role:** Secure gateway for the backend API.
*   **Configuration:**
    *   **Tier:** Consumption tier for cost-effectiveness.
    *   **APIs:** Define a new API for the "Habit Tracker".
    *   **Operations:** Create operations that map to the backend functions (e.g., `GET /habits`, `POST /habits`, `GET /habits/{id}`).
    *   **Backend:** The backend for these operations will be the Azure Function App.
    *   **CORS:** Configure a Cross-Origin Resource Sharing (CORS) policy to allow requests from the Static Web App's domain.
*   **Note on Simplicity:** While APIM represents a production-ready best practice, a simpler alternative for a hobby project is to link the Static Web App directly to the Azure Function App. The Static Web App can still proxy requests to `/api/*`, providing a simpler setup at the cost of losing the advanced features of APIM (like custom policies, advanced caching, and a single management plane for multiple APIs).

## 3. Azure Functions

*   **Role:** Hosts the serverless backend business logic.
*   **Configuration:**
    *   **Runtime Stack:** JVM (to run Kotlin).
    *   **Hosting Plan:** Consumption (Serverless) plan.
    *   **Functions:** You will create several functions triggered by HTTP requests from API Management:
        *   `GetHabits`: Handles `GET /habits`.
        *   `CreateHabit`: Handles `POST /habits`.
        *   `GetHabitById`: Handles `GET /habits/{id}`.
        *   `UpdateHabit`: Handles `PUT /habits/{id}`.
        *   `DeleteHabit`: Handles `DELETE /habits/{id}`.
    *   **Application Settings:** The connection string for Cosmos DB will be stored securely in **Azure Key Vault**, and the Function App will be configured with a Key Vault Reference to access it. This avoids exposing the raw connection string in the Function App's settings.

## 4. Azure Cosmos DB (API for MongoDB)

*   **Role:** Primary data store for the application.
*   **Configuration:**
    *   **API:** API for MongoDB.
    *   **Capacity Mode:** Serverless. This is crucial for keeping costs low on a hobby project.
    *   **Database:** A database named `HabitTracker`.
    *   **Collection:** A collection named `habits` to store the habit documents.
    *   **Networking:** For simplicity, the database will be accessible from all Azure services. For a production application, you would lock this down using a **private endpoint** or **service endpoint** to ensure it is only accessible from within your virtual network, providing a much higher level of security.
