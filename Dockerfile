# COMMANDS
# docker build . -t <user-docker>/<app-name>
# docker run -d -p 8080:8080 --name <container-name> --env-file <.env> <user-docker>/<app-name>

# EXAMPLES
# docker build -t nestjs-starter .
# docker run -d -p 8080:8080 --name nestjs-starter-app--env-file .env nestjs-starter
# docker run -it -p 8080:8080 --name nestjs-starter-app --env-file .env nestjs-starter
# docker system prune

#docker run -it --rm --entrypoint=sh nestjs-starter

FROM node:14-alpine3.15 as builder

ARG NODE_ENV=build
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

# ---

FROM node:14-alpine3.15
LABEL name=nestjs-starter

USER node
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
ENTRYPOINT ["yarn", "start"]
