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
        stage('Startup') {
            steps {
                // start the backend and frontend as background processes
                script {
                    def utils = load("./utils.groovy")

                    echo "Starting backend on port ${BACKEND_PORT}"
                    utils.startBackend(BACKEND_PORT)

                    echo 'Installing frontend dependencies'
                    utils.installFrontendDependencies()

                    echo "Starting frontend on port ${FRONTEND_PORT}"
                    utils.startFrontend(FRONTEND_PORT, BACKEND_PORT)

                    echo 'Waiting until frontend and backend are ready...'
                    utils.waitForPort(FRONTEND_PORT)
                    utils.waitForPort(BACKEND_PORT)
                    echo 'ready!'
                }
            }
        }
        // stage('Test') {
        //     steps {
        //         echo 'Testing the frontend'
        //         bat 'cd ./frontend && npm run test'
        //     }
        // }
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

            // junit 'frontend/test-results/junit.xml'
        }
    }
}
