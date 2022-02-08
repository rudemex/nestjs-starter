# COMMANDS
# docker build . -t <user-docker>/<app-name>
# docker run -d -p 8080:8080 --env-file <.env> <user-docker>/<app-name>

# EXAMPLES
# docker build -t nestjs-starter .
# docker run -d -p 8080:8080 --env-file .env.prod nestjs-starter
# docker system prune

FROM node:14-alpine3.14 as builder

ARG NODE_ENV=build
ENV NODE_ENV=${NODE_ENV}

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
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
CMD ["node", "dist/main"]
