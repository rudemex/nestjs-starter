# docker build . -t <user-docker>/nestjs-starter
# docker run -d -p 8080:8080 --env-file .env.prod <user-docker>/nestjs-starter

# docker build -t nestjs-starter .
# docker run -d -p 8080:8080 --env-file .env.prod nestjs-starter

FROM node:14-alpine3.14 as builder

ARG APP_BUILD=build
ENV APP_BUILD=${APP_BUILD}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production

# ---

FROM node:14-alpine3.14

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
#COPY --from=builder /usr/src/app/.env ./
#COPY --from=builder /usr/src/app/.env.prod ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
CMD ["node", "dist/main"]
