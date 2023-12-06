pipeline {
    agent any
    tools {
        nodejs "node"
        dockerTool "docker"
    }
    environment {
        scannerHome = tool name: 'scanner'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        registry = "m790101/jenkins-test"
        dockerImage = ''
        DOCKER_PASS = 'dockerhub'
    }
    stages {
        // stage("Sonarqube Scanning") {
        //     steps {
        //         script {
        //                 withSonarQubeEnv('sonarqube') {
        //                     sh """
        //                             ${scannerHome}/bin/sonar-scanner \
        //                             -Dsonar.projectKey=jenkinscicd \
        //                                 -Dsonar.sources=. \
        //                                 -Dsonar.host.url=http://localhost:9000 \
        //                                 -Dsonar.token=sqa_ec393a359a9ccc7a661f42de0b9a149e8e99d7d3
        //                     """
        //                 }
        //         }
        //     }
        // }
        // stage("Quality Gate") {
        //     steps {
        //         timeout(time: 1, unit: 'HOURS') {
        //             // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
        //             // true = set pipeline to UNSTABLE, false = don't
        //             waitForQualityGate abortPipeline: false
        //         }
        //     }
        // }
        stage('build'){
            steps {
                script {
                    sh "npm install"
                    echo "install done"
                    sh "npm run build"
                    echo "build done"
                }
            }
        }
        stage('Clone repository') {
        steps {
                // Checkout the source code from your version control system
                // Replace the repository URL and credentials as needed
                checkout scm
            }
        }
        stage('Build doker image') {
            steps {
                script {
                dockerImage = docker.build("m790101/jenkins-test:latest")
                }
            }
        }
        stage('Login') {
            steps {
                sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR --password-$DOCKERHUB_CREDENTIALS_PSW'
            }
        }
        stage('Push docker image') {
            steps {
                // Push the Docker image to a container registry
                // Replace the registry URL and credentials as needed
                sh 'docker push m790101/jenkins-test:latest'
            }
        }
        stage('deploy'){
            steps {
                script {
                    sh "echo deploy15"
                    // Deploy the Docker container on GKE
                    // Replace the GKE cluster name, namespace, and deployment name as needed
                    // sh 'gcloud container clusters get-credentials your-gke-cluster --zone your-gke-zone --project your-gcp-project'
                    // sh 'kubectl apply -f your-deployment.yaml -n your-namespace'
                }
            }
        }
    }
}

