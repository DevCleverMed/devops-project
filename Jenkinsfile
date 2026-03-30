pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    // SonarQube analysis configuration
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            docker run --rm \
                            -v ${PWD}:/usr/src \
                            sonarsource/sonar-scanner-cli \
                            -Dsonar.projectKey=devops-project \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=${SONAR_HOST_URL} \
                            -Dsonar.login=${SONAR_TOKEN}
                        '''
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} build'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} up -d'
            }
        }
        
        stage('Test') {
            steps {
                script {
                    try {
                        sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} ps'
                        sh 'curl -f http://localhost:80 || exit 1'
                        sh 'curl -f http://localhost:5000/api/health || exit 1'
                    } catch (err) {
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
    
    post {
        success {
            slackSend(
                color: 'good',
                message: "Pipeline succeeded: ${env.JOB_NAME} - ${env.BUILD_NUMBER}\nApp is running at http://localhost:80"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "Pipeline failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
    }
}