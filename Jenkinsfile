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
                    def myUtils = load './utils.groovy'

                    echo "Starting backend on port ${BACKEND_PORT}"
                    myUtils.startBackend(BACKEND_PORT)

                    echo 'Installing frontend dependencies'
                    bat 'cd ./frontend && npm ci'

                    echo "Starting frontend on port ${FRONTEND_PORT}"
                    bat """
                        cd ./frontend
                        start "" cmd /c "set VITE_BACKEND_PORT=${BACKEND_PORT} && npm run dev -- --port ${FRONTEND_PORT}"
                    """

                    echo 'waiting for 1 minute'
                    sleep(60)
                }
                // echo 'Waiting until frontend and backend are ready'
                // script {
                //     //myUtils.waitForPort(FRONTEND_PORT)
                //     myUtils.waitForPort(env.BACKEND_PORT as int)
                // }
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
            bat """
                for /f "tokens=5" %%i in ('netstat -ano ^| findstr :${BACKEND_PORT}') do (set PID=%%i)
                taskkill /PID PID
            """

            // echo 'Shutting down frontend'
            // bat """
            //     for /f "tokens=5" %%j in ('netstat -ano ^| findstr :${FRONTEND_PORT}') do (set PID=%%j)
            //     taskkill /PID PID
            // """

            // junit 'frontend/test-results/junit.xml'
        }
    }
}
