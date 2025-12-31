import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.9.22"
    id("com.microsoft.azure.azurefunctions") version "1.13.0"
}

group = "com.finnminn.pip.tracker"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.microsoft.azure.functions:azure-functions-java-library:3.0.0")
    testImplementation(kotlin("test"))
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.1")
    testImplementation("org.mockito:mockito-core:4.5.1")
}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "17"
}

azurefunctions {
    resourceGroup = "pip-rg"
    appName = "pip-tracker"
    pricingTier = "Consumption"
    region = "westus"
    runtime {
        os.set("linux")
        javaVersion.set("17")
    }
    localDebug = "transport=dt_socket,server=y,suspend=n,address=5005"
}
