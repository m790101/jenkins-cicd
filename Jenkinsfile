pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        scannerHome = tool name: 'scanner'
    }
    stages {
        stage("Sonarqube Scanning") {
            steps {
                script {
                        withSonarQubeEnv('sonarqube') {
                            sh """
                                    ${scannerHome}/bin/sonar-scanner \
                                    -Dsonar.projectKey=jenkinscicd \
                                        -Dsonar.sources=. \
                                        -Dsonar.host.url=http://localhost:9000 \
                                        -Dsonar.token=sqa_ec393a359a9ccc7a661f42de0b9a149e8e99d7d3
                            """
                        }
                }
            }
        }
        stage("SonarQube Quality Gate") { 
        timeout(time: 1, unit: 'HOURS') { 
           def qg = waitForQualityGate() 
           if (qg.status != 'OK') {
             error "Pipeline aborted due to quality gate failure: ${qg.status}"
           }
        }
    }
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
                    sh "echo deploy15"
                    // sh "scp -r dist/scic_ecover_fe/ tpiuser@10.20.30.211:/home/tpiuser/ecover/apache-tomcat-9.0.65/webapps/"
                }
            }
        }
    }
}

