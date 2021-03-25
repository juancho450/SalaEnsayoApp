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
            stage('compilar') {
                steps {
                    sh 'npm i'
                    sh 'ng build'
                }
            }
            stage('test') {
                steps {
                    sh 'ng test'
                }
            }
            stage('lint') {
                steps {
                    sh 'ng lint'
                }
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