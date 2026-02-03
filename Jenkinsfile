pipeline {
    agent any

    tools {
        nodejs 'Node22'
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
                dir('backend/weather_be/'){
                    bat '''
                    "C:/Users/Dell/AppData/Local/Programs/Python/Python313/python.exe" -m venv %VENV%
                    call %VENV%/Scripts/activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                    '''
                }
            }
        }
        stage('Frontend Setup'){
            steps {
                dir('frontend/weather/'){
                    bat '''
                    npm install
                    '''
                }
            }
        }
        stage('Frontend Build'){
            steps {
                dir('frontend/weather/'){
                    bat '''
                    npm run build
                    '''
                }
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
