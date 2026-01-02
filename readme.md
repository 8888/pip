### Pip  
[pip.finnminn.com](https://pip.finnminn.com)

**Note: Access to the web application requires authentication via GitHub.**

![Pip Banner](docs/assets/banner.svg)

## API Usage

**Base URL:** `https://pip-api.azure-api.net/pip-tracker`

| Endpoint | Methods | Description |
| :--- | :--- | :--- |
| `/hello` | `GET`, `POST` | Basic health check and testing endpoint. |

## Local Development

### Prerequisites
- Java 21
- Gradle (wrapper provided)

### Running the Function
To start the Azure Functions host locally:
```bash
./gradlew azureFunctionsRun
```

The function will be available at: `http://localhost:7071/api/hello`

### Managing the Process (macOS)
If the process hangs or you need to stop it manually:

1. **Find the Process ID (PID):**
   Check for processes listening on port 7071:
   ```bash
   lsof -i :7071
   ```
   Or search for the Java process:
   ```bash
   ps aux | grep java
   ```

2. **Kill the Process:**
   Use the PID found in the previous step:
   ```bash
   kill -9 <PID>
   ```

## Deployment

### GitHub Actions
This project uses GitHub Actions for continuous deployment.

- **Pipeline:** `.github/workflows/deploy.yml`
- **Trigger:** Automatic deployment to Azure on every push to the `main` branch.
- **Secret Required:** `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` must be configured in the GitHub repository secrets.
