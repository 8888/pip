# Pip - Serverless Habit Tracker

## Project Overview
This project, "Pip", is the backend for a serverless habit tracking application. It is built using Kotlin and runs on Azure Functions. The architecture is designed to be cost-effective and scalable, leveraging managed Azure services.

## Technology Stack
- **Language:** Kotlin (JVM Target 21)
- **Framework:** Azure Functions (Java Library 3.1.0)
- **Build System:** Gradle (Kotlin DSL)
- **Testing:** JUnit 5, Mockito
- **Database:** Azure Cosmos DB for NoSQL (Core SQL) - *Note: Architecture originally specified MongoDB, but resource is SQL API.*

## Deployed Infrastructure (Resource Group: `pip-rg`)
The following resources are currently deployed on Azure. Note the split across regions (`canadacentral` and `eastus`).

| Resource Name | Type | Location | Details |
| :--- | :--- | :--- | :--- |
| **pip-tracker** | Function App | `canadacentral` | Linux, Consumption Plan (Y1), System Assigned Identity. |
| **ASP-piprg-a804** | App Service Plan | `canadacentral` | Dynamic (Serverless). |
| **piprg9b25** | Storage Account | `canadacentral` | Standard_LRS. Used by Function App. |
| **pip-cosmos** | Cosmos DB Account | `eastus` | **NoSQL (Core) API**, Serverless capacity mode. |
| **pip-vault** | Key Vault | `eastus` | For managing secrets. |

*Note: Azure Static Web App and API Management are not currently deployed.*

## Getting Started

### Prerequisites
- Java 21
- Gradle (Wrapper provided)
- Azure Functions Core Tools (for local running)

### Build and Run
- **Build:** `./gradlew build`
- **Run Locally:** `./gradlew azureFunctionsRun`
  - The function will be available at: `http://localhost:7071/api/hello`
- **Run Tests:** `./gradlew test`

### Debugging (macOS)
If the local process hangs on port 7071:
1. Find PID: `lsof -i :7071` or `ps aux | grep java`
2. Kill: `kill -9 <PID>`

## Project Structure
- **`src/main/kotlin/.../FunctionApp.kt`**: Main entry point containing Azure Function triggers.
- **`build.gradle.kts`**: Project dependencies and build configuration.
- **`host.json`**: Global configuration options for all functions in the function app.
- **`local.settings.json`**: (Excluded from git) Environment variables and connection strings for local development.
- **`docs/architecture/`**: Detailed architectural documentation and diagrams.

## Architecture
The system follows a serverless architecture, though currently only the backend and data layer are deployed:
1.  **Frontend**: Azure Static Web App (Vanilla JS) - *Planned/Not Deployed*.
2.  **API Gateway**: Azure API Management - *Planned/Not Deployed*.
3.  **Backend**: Azure Functions (deployed `pip-tracker`).
4.  **Database**: Azure Cosmos DB (deployed `pip-cosmos` as NoSQL/Core API).

## Development Conventions
- **Language**: Strict Kotlin.
- **Build**: Prefer `./gradlew` wrapper over local gradle installation.
- **Configuration**: Use `local.settings.json` for secrets; never commit keys.
