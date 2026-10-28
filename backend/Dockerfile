FROM node:24-alpine

WORKDIR /app

# Copier package.json en premier — optimise le cache Docker
# Si package.json n'a pas changé, npm ci n'est pas relancé
COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/

EXPOSE 8080

CMD ["node", "src/app.js"]

