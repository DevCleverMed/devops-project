# Projet DevOps - Pipeline CI/CD

## Architecture
- Frontend: React + Nginx
- Backend: Node.js + Express
- Database: MongoDB

## Outils utilisés
- GitHub (Code source)
- GitHub Actions (CI)
- Jenkins (CD)
- Docker & Docker Compose (Conteneurisation)
- SonarQube (Qualité du code)
- Slack (Notifications)

## Pipeline CI/CD
1. Push sur GitHub
2. GitHub Actions exécute les tests
3. Webhook déclenche Jenkins
4. Jenkins build et déploie
5. SonarQube analyse le code
6. Slack envoie une notification

## Comment exécuter
```bash
docker-compose up -d
