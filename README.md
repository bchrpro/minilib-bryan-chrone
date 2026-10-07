#Minilib


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

## Démarrage rapide
 
```bash
# Cloner le repo
git clone https://github.com/bryanchr/minilib-bryan-chrone.git
cd minilib
 
# Configurer l'environnement
cp .env.example .env
# (éditer .env avec vos valeurs locales)
 
# Lancer l'application complète
docker compose up -d
 
# Vérifier que tout tourne
curl http://localhost:3001/api/v1/health
```
 
L'application est accessible sur :
- **Frontend** : http://localhost:5173
- **API** : http://localhost:3001/api/v1
- **Documentation API (Swagger)** : http://localhost:3001/api/docs


