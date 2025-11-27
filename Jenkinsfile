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
                bat 'cd ./frontend'
                bat 'npm ci'
                bat 'npm run test'
            }
        }
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying....'
        //     }
        // }
    }
}
