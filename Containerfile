FROM node:lts AS build
WORKDIR /usr/src/app
COPY ./Logship/package*.json ./
RUN npm install
COPY ./Logship/ ./
RUN npm run build

# Deployment step

FROM busybox:latest as deploy
RUN adduser -D static
USER static
WORKDIR /home/static
COPY --from=build /usr/src/app/build/ ./

EXPOSE 3001
CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]