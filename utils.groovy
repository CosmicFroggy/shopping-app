void startBackend(int port) {
    bat """
        cd ./backend
        start "" mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=${port}"
    """
}

void installFrontendDependencies() {
    bat 'cd ./frontend && npm ci'
}

void startFrontend(int port, int backendPort) {
    bat """
        cd ./frontend
        start "" cmd /c "set VITE_BACKEND_PORT=${backendPort} && npm run dev -- --port ${port}"
    """
}

boolean serverHealthy(String url) {
    def status = bat script: "curl -s --head --fail ${url}", returnStatus: true
    return (status == 0)
}

void testFrontend(int frontendPort) {
    bat """
        cd ./frontend
        set FRONTEND_PORT=${frontendPort}
        npm run test"
    """
}

return this;
