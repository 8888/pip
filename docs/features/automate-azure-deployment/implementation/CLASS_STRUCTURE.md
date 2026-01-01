# Class and Component Structure

## Existing Classes Involved
- `com.finnminn.pip.tracker.FunctionApp`: The main entry point for the Azure Function. This is the code being built and deployed.

## Workflow Structure (YAML Logic)
The deployment is defined in `.github/workflows/deploy.yml`. It acts as the orchestration layer:

| Component | Responsibility |
| :--- | :--- |
| `checkout` | Fetches the source code. |
| `setup-java` | Configures the runtime environment (JDK 21). |
| `gradle-build` | Triggers `./gradlew clean build`. |
| `azure-deploy` | Pushes the build output to Azure. |
