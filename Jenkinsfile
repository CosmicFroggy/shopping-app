def utils

pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    environment {
        BACKEND_PORT = 8083
        FRONTEND_PORT = 5175
    }

    stages {
        stage('Init') {
            steps {
                script {
                    utils = load('./utils.groovy')
                }
            }
        }
        stage('Startup') {
            steps {
                // start the backend and frontend as background processes
                echo "Starting backend on port ${BACKEND_PORT}"
                utils.startBackend(BACKEND_PORT as int)

                echo 'Installing frontend dependencies'
                utils.installFrontendDependencies()

                echo "Starting frontend on port ${FRONTEND_PORT}"
                utils.startFrontend(FRONTEND_PORT as int, BACKEND_PORT as int)

                echo 'Waiting for frontend and backend...'
                timeout(time:1, unit: 'MINUTES') {
                    waitUntil {
                        utils.serverHealthy("http://localhost:${BACKEND_PORT}/actuator/health")
                    }
                    waitUntil {
                        utils.serverHealthy("http://localhost:${FRONTEND_PORT}/health")
                    }
                }
                echo 'ready'
            }
        }
        stage('Test') {
            steps {
                script {
                    echo 'Testing the frontend'
                    utils.testFrontend(FRONTEND_PORT as int)
                }
            }
        }
    }

    post {
        always {
            echo 'Shutting down backend'
            // bat """
            //     for /f "tokens=5" %%i in ('netstat -ano ^| findstr :${BACKEND_PORT}') do (set PID=%%i)
            //     taskkill /PID PID
            // """

            echo 'Shutting down frontend'
            // bat """
            //     for /f "tokens=5" %%j in ('netstat -ano ^| findstr :${FRONTEND_PORT}') do (set PID=%%j)
            //     taskkill /PID PID
            // """

            junit 'frontend/test-results/junit.xml'
        }
    }
}
