void startBackend(int port) {
    powershell script: """
        cd ./backend
        Start-Process -FilePath "mvn" -ArgumentList "spring-boot:run -Dspring-boot.run.arguments='--server.port=${port}'"

    """
}

void installFrontendDependencies() {
    bat 'cd ./frontend && npm ci'
}

String startFrontend(int port, int backendPort) {
    String pid = powershell script: """
        cd ./frontend
        \$Env:VITE_BACKEND_PORT = "${backendPort}"
        \$process = Start-Process -FilePath "node" -ArgumentList "node_modules/vite/bin/vite.js --port ${port}" -PassThru
        echo \$process.Id
    """, returnStdout:true
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

void stopProcess(int id) {
    powershell """
        Stop-Process -Id ${id} -Force
    """
}

return this;
