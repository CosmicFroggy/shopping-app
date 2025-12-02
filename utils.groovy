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

void waitForPort(int port, int timeoutSeconds = 30) {
    echo timeoutSeconds.toString()
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

void testFrontend(int frontendPort) {
    bat """
        cd ./frontend
        set FRONTEND_PORT=${frontendPort}
        npm run test"
    """
}

return this;
