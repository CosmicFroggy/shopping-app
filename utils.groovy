void startBackend(String port) {
    bat """
        cd ./backend
        start "" mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=${port}"
    """
}

void installFrontendDependencies() {
    bat 'cd ./frontend && npm ci'
}

void startFrontend(String port, String backendPort) {
    bat """
        cd ./frontend
        start "" cmd /c "set VITE_BACKEND_PORT=${backendPort} && npm run dev -- --port ${port}"
    """
}

void waitForPort(String port, Integer timeoutSeconds = 30) {
    Integer deadline = System.currentTimeMillis() + timeoutSeconds * 1000
    while (System.currentTimeMillis() < deadline) {
        try {
            // open a socket to the given port then immediately close it
            // opening the socket will throw an exception if the port
            // is not listening
            new Socket('localhost', port).close()
            echo "Port ${port} is now open"
            return
        } catch (IOException ignored) {
            // wait 1 second then let the loop continue and try again
            sleep 1000
        }
    }

    error "Timeout waiting for port ${port} to open"
}

return this;
