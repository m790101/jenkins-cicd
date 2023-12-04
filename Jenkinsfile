pipeline {
    agent any
    tools {nodejs "node"}
    stages {
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
                    sh "echo deploy1"
                    // sh "scp -r dist/scic_ecover_fe/ tpiuser@10.20.30.211:/home/tpiuser/ecover/apache-tomcat-9.0.65/webapps/"
                }
            }
        }
    }
  
}