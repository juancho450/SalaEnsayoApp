pipeline {
        agent {
            label 'Slave_Induccion'
        }

        triggers {
            pollSCM('@hourly')
        }

        options {
            buildDiscarder(logRotator(numToKeepStr: '5'))
            disableConcurrentBuilds()
        }

         stages {
            stage('Install') {
                steps { sh 'npm install' }
            }

            stage('Test') {
            parallel {
                stage('Static code analysis') {
                    steps { sh 'npm run-script lint' }
                }
                stage('Unit tests') {
                    steps { sh 'npm run-script test' }
                }
            }
            }

            stage('Build') {
            steps { sh 'npm run-script build' }
            }
        }
        post {
            failure {
                mail(to: 'sebastian.parrasi@ceiba.com.co',
                body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
                subject: "ERROR CI: ${env.JOB_NAME}")
            }
        }
}

