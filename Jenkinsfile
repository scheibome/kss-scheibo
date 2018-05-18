pipeline {
  agent {
    node {
      label 'npminstall'
    }

  }
  stages {
    stage('develop') {
      steps {
        sh 'npm install'
      }
    }
  }
}