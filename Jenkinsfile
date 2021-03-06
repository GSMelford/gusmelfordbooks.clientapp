#!groovy

pipeline {
    agent any
    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        CONTAINER_NAME = "gusmelfordbooks.clientapp"
        DOCKER_CONTAINER_TAG = "latest"
        DOCKER_REPO = "gsmelford"
        PORT = "5668"
    }

    stages {
        stage("Build docker image") {
            steps {
                script {
                    echo "=== building image ==="
                    sh "docker build -t $DOCKER_REPO/$CONTAINER_NAME:$DOCKER_CONTAINER_TAG ."
                }
            }
        }
        stage("Push docker image") {
            steps {
                echo "=== pushing image ==="
                sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                sh "docker push $DOCKER_REPO/$CONTAINER_NAME:$DOCKER_CONTAINER_TAG"
            }
        }
        stage("Update and preparation docker-compose") {
            steps {
                echo "=== stop the old docker-compose ==="
                sh "docker-compose down"
                echo "=== docker pull ==="
                sh "docker-compose pull"
            }
        }
        stage("Up docker-compose") {
            steps {
                echo "=== running docker-compose ==="
                sh "docker-compose up -d"
                echo "=== docker prune ==="
                sh "docker system prune -a -f"
            }
        }
    }
    post {
        always {
            sh "docker logout"
        }
    }
}