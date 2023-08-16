FROM node:lts AS build
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false
WORKDIR /usr/src/app
COPY ./Logship/ ./
RUN npm install
RUN npm run build

# Deployment step
FROM docker.io/library/nginx:stable-alpine as deploy
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/src/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
