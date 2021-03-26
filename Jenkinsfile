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

            stage('Lint') {
                steps {
                    sh 'npm run-script lint'
                }
            }

            stage('Test') {
                steps {
                    sh 'npm run-script test'
                }
            }

            stage('Build') {
                steps { sh 'npm run-script build' }
            }

            stage('Sonar Analysis') {
                steps {
                    echo '------------>Analisis de código estático<------------'
                    withSonarQubeEnv('Sonar') {
                        sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=co.com.ceiba.ceiba.adn:SalaEnsayo-sebastian.parrasi -Dsonar.projectName=CeibaADN-SalaEnsayo(sebastian.parrasi) -Dproject.settings=./sonar-project.properties"
                    }
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

