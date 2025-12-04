def utils

pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    environment {
        BACKEND_PORT = 8083
        FRONTEND_PORT = 5175
        FRONTEND_PID = null
        BACKEND_PID = null
    }

    stages {
        stage('Init') {
            steps {
                script {
                    echo 'Loading utility scripts'
                    utils = load('./utils.groovy')
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo 'Building backend'
                    utils.buildBackend()
                }
            }
        }

        stage('Startup') {
            steps {
                script {
                    // start the backend and frontend as background processes
                    echo "Starting backend on port ${BACKEND_PORT}"
                    BACKEND_PID = utils.startBackend(BACKEND_PORT as int)

                    echo 'Waiting for backend...'
                    timeout(time:1, unit: 'MINUTES') {
                        waitUntil {
                            utils.serverHealthy("http://localhost:${BACKEND_PORT}/actuator/health")
                        }
                    }
                    echo 'Backend ready'

                    echo 'Installing frontend dependencies'
                    utils.installFrontendDependencies()

                    echo "Starting frontend on port ${FRONTEND_PORT}"
                    FRONTEND_PID = utils.startFrontend(FRONTEND_PORT as int, BACKEND_PORT as int)

                    echo 'Waiting for frontend...'
                    timeout(time:1, unit: 'MINUTES') {
                        waitUntil {
                            utils.serverHealthy("http://localhost:${FRONTEND_PORT}/health")
                        }
                    }
                    echo 'Frontend ready'
                }
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

        stage('Shutdown') {
            steps {
                script {
                    echo 'Shutting down backend'
                    utils.stopProcess(BACKEND_PID as int)

                    echo 'Shutting down frontend'
                    utils.stopProcess(FRONTEND_PID as int)
                }
            }
        }
    }

    post {
        always {
            junit 'frontend/test-results/junit.xml'
        }
    }
}
