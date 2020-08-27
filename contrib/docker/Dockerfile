# build environment
FROM node:alpine as builder
#FROM node:12.18.3-alpine3.12 as builder
#RUN apk --no-cache --update --virtual build-dependencies add build-base python
#RUN apk --no-cache --update --virtual build-dependencies add \
#    tzdata \
#    build-base python \
#    && npm install \
#    && apk del build-dependencies
#ENV TZ Australia/Sydney

RUN apk add --no-cache python make g++




ENV NPM_CONFIG_LOGLEVEL warn
#RUN npm install -g yarn
RUN yarn global add serve

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json package.json
#RUN npm install
#RUN apk del build-dependencies

COPY . .
COPY ./contrib/docker/entrypoint.sh .
#RUN npm run build --production
RUN yarn install
RUN yarn build

CMD ./entrypoint.sh
EXPOSE 5000
