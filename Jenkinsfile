

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
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
    post {
        always {
            echo 'I will always say Hello again!'
        }
    }
}
