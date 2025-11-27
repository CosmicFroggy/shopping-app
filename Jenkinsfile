pipeline {
    agent any

    stages {
        // stage('Build') {
        //     steps {
        //         echo 'Building..'
        //     }
        // }
        stage('Test') {
            steps {
                bat 'cd ./frontend && npm ci && npm run test'
            }
        }
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying....'
        //     }
        // }
    }

    post {
        always {
            junit 'frontend/test-results/junit.xml'
        }
    }
}
