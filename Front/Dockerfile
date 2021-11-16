FROM jenkins/jenkins:lts-jdk11

COPY --chown=jenkins:jenkins https.pem /var/lib/jenkins/cert
COPY --chown=jenkins:jenkins https.key /var/lib/jenkins/pk
ENV JENKINS_OPTS --httpPort=-1 --httpsPort=8083 --httpsCertificate=/var/lib/jenkins/cert --httpsPrivateKey=/var/lib/jenkins/pk
EXPOSE 8083
