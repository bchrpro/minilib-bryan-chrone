# Minilib


> Minilib est une application web conçue pour la bibliothèque municipale de Villemont permettant de gérer:
 
* consulter et gérer le catalogue de livres
* Gérer les adhérents de la bibliothèque
* Enregistrer les emprunts et les retours
* Savoir quels livres sont disponibles et lesquels sont en retard
* Accéder à l'application depuis n'importe quel ordinateur via un navigateur

## Stack

- **Frontend** : React 18 + Vite + TanStack Query + Tailwind CSS
- **Backend** : Node.js 20 + Express 5
- **Base de données** : PostgreSQL 16
- **Conteneurisation** : Docker + Docker Compose

## Démarrage avec Docker
### Prérequis
- Docker 26+ et Docker Compose v2+
### Développement
```bash
# Copier les variables d'environnement
cp .env.example .env
# Remplir .env avec vos valeurs
# Démarrer l'application complète
docker compose up --build
# Accéder à l'application
# Frontend : http://localhost:3000
# API : http://localhost:8080
```
### Production
```bash
docker compose -fdocker-compose.prod.yml up -d --build
```