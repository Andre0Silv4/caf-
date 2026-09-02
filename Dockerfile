# ---------- stage 1: build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependências primeiro (camada cacheável: só reroda se package*.json mudar)
COPY package*.json ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# Copia o restante do código e builda
COPY . .
RUN npm run build

# ---------- stage 2: serve ----------
FROM nginx:1.27-alpine AS serve
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
