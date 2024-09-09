FROM node:18-alpine as base

FROM base as builder

WORKDIR /app
COPY package*.json ./

COPY . .
RUN npm install
RUN npm run build

FROM base as runtime

WORKDIR /app
COPY package*.json  ./

RUN npm install
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3001