# ─── Stage 1 : compiler le projet React ──────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .


# Variable d'environnement Vite pour l'URL de l'API
# En production Docker, Nginx proxy /api/ → backend:8080
ENV VITE_API_URL=http://localhost:8080/api/v1
RUN npm run build
# dist/ contient les fichiers statiques compilés


# ─── Stage 2 : servir avec Nginx (image ~25Mo) ───────────────────
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

