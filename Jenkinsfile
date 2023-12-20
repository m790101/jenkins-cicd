pipeline {
    agent any
    tools {
        nodejs "node"
    }
    environment {
        scannerHome = tool name: 'scanner'

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
        stage('deploy'){
            steps {
                script {
                    echo "deploy with your own choice"
                }
            }
        }
    }
}

