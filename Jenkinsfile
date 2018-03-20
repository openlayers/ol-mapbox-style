node {
  withCredentials([
    string(credentialsId: 'boundlessgeoadmin-token', variable: 'GITHUB_TOKEN'),
    string(credentialsId: 'sq-boundlessgeo-token', variable: 'SONAR_TOKEN'),
    string(credentialsId: 'sonarqube-github-token', variable: 'SONAR_GITHUB_TOKEN'),
    string(credentialsId: 'NPM_TOKEN', variable: 'NPM_TOKEN'),
  ]) {

    try {
      stage('Checkout'){
        checkout scm
          echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
      }


      stage('Test'){
        sh """
          docker run -v \$(pwd -P):/web \
                     -w /web quay.io/boundlessgeo/node-yarn-sonar bash \
                     -c 'npm install && npm test'
          """
      }

      stage('Coverage'){
        sh """
          docker run -v \$(pwd -P):/web \
                     -w /web quay.io/boundlessgeo/node-yarn-sonar bash \
                     -c 'npm run cover'
          """
      }

      if (env.CHANGE_ID != null) {

        stage('SonarQube GitHub PR') {

          sh """
            docker run -v \$(pwd -P):/web \
                       -w /web quay.io/boundlessgeo/b7s-sonarqube-scanner \
                       bash -c 'sonar-scanner -Dsonar.analysis.mode=preview \
                                              -Dsonar.github.pullRequest=${env.CHANGE_ID} \
                                              -Dsonar.projectKey=ol-mapbox-style \
                                              -Dsonar.sources=. \
                                              -Dsonar.exclusions=coverage/** \
                                              -Dsonar.language=js \
                                              -Dsonar.projectName=ol-mapbox-style \
                                              -Dsonar.github.repository=boundlessgeo/ol-mapbox-style \
                                              -Dsonar.github.oauth=${SONAR_GITHUB_TOKEN} \
                                              -Dsonar.host.url=https://sq.boundlessgeo.io \
                                              -Dsonar.login=$SONAR_TOKEN'
            """
        }
      }

      if (env.BRANCH_NAME == 'master'){
        stage('SonarQube Analysis'){
          def projectVersion = (env.CHANGE_ID != null) ? "${env.BUILD_NUMBER}.${env.CHANGE_ID}" : "${env.BUILD_NUMBER}"
          sh """
            docker run -v \$(pwd -P):/web \
                         -w /web quay.io/boundlessgeo/b7s-sonarqube-scanner bash \
                         -c 'dependency-check --project ol-mapbox-style \
                                --disableBundleAudit \
                                --disableAssembly \
                                --out . \
                                --scan . \
                                -f ALL \
                             && sonar-scanner -Dsonar.host.url=https://sq.boundlessgeo.io \
                                              -Dsonar.login=$SONAR_TOKEN \
                                              -Dsonar.projectKey=ol-mapbox-style \
                                              -Dsonar.projectVersion=${projectVersion} \
                                              -Dsonar.language=js \
                                              -Dsonar.projectName=ol-mapbox-style \
                                              -Dsonar.dependencyCheck.reportPath=dependency-check-report.xml \
                                              -Dsonar.dependencyCheck.htmlReportPath=dependency-check-report.html \
                                              -Dsonar.sources=. \
                                              -Dsonar.exclusions=coverage/** \
                                              -Dsonar.coverage.exclusions=coverage/**,env-setup.js,__tests__/**,webpack.config.js \
                                              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info'
          """
        }
      }
      currentBuild.result = "SUCCESS"
    }
    catch (err) {

      currentBuild.result = "FAILURE"
        throw err
    } finally {
      // Success or failure, always send notifications
      echo currentBuild.result
    }

  }
}
