void startBackend(int port) {
    bat """
        cd ./backend
        start "" mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=${port}"
    """
}

void installFrontendDependencies() {
    bat 'cd ./frontend && npm ci'
}

String startFrontend(int port, int backendPort) {
    String pid = powershell """
        cd ./frontend
        \$process = Start-Process -FilePath "npm.cmd" -ArgumentList "run dev -- --port ${port}" -Environment @{VITE_BACKEND_PORT='${backendPort}'} -PassThru
        echo $process.Id
    """
    return pid
}

boolean serverHealthy(String url) {
    int status = bat script: "curl -s --head --fail ${url}", returnStatus: true
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
