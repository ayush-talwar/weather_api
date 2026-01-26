pipeline {
    agent any

    tools {
        nodejs 'Node24'
    }

    environment {
        venv = "venv"
    }

    stages {
        stage('checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ayush-talwar/weather_api.git'
            }
        }
        stage('Backend Setup'){
            steps {
                dir('backend'){
                    bat '''
                    python -m venv %venv%
                    %venv%\\Scripts\\activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                    '''
                }
            }
        }
        stage('Frontend Setup'){
            steps {
                dir('frontend'){
                    bat '''
                    npm install
                    '''
                }
            }
        }
        stage('Frontend Build'){
            steps {
                dir('frontend'){
                    bat '''
                    npm run build
                    '''
                }
            }
        }
        post {
            success {
                echo 'Successfully Build'
            }
            failure {
                echo 'Build Failed'
        }
    }
}
}
