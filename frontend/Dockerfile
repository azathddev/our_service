FROM node:20-alpine

WORKDIR /vite

COPY package.json package-lock.json ./

RUN npm ci --no-audit --no-fund

COPY . .