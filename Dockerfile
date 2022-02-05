FROM node:14-alpine3.14 as builder

ARG APP_BUILD=build
ENV APP_BUILD=${APP_BUILD}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ---

FROM node:14-alpine as production

ARG NODE_ENV=production \
    IGNORE_ENV_FILE=false
ENV NODE_ENV=${NODE_ENV} \
    IGNORE_ENV_FILE=${IGNORE_ENV_FILE}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.env.prod ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
CMD ["node", "dist/main"]
