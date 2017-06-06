

/*pipeline{
    agent any
    stages {

       stage('Checkout'){

          checkout scm
       }

       stage('Test'){

         sh 'node -v'
         sh 'npm install'

       }

    }

}*/

pipeline {
    agent any
    stages {
        stage('Check') {
            steps {
                echo 'Version'
                sh 'node -v'
            }
        }
        stage('Dependancy') {
            steps {
                echo 'Dependancy install'
                sh 'npm install'
            }
        }
    }
    post {
        always {
            echo 'Half exicution completed'
        }
    }
}
