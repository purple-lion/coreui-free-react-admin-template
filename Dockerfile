FROM node:alpine as builder

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache python make g++
COPY package.json package.json
RUN npm install 
# [ your npm dependencies here ]

FROM node:alpine as app

## Copy built node modules and binaries without including the toolchain
COPY --from=builder node_modules .
COPY src .
COPY craco.config.js .
COPY package.json .

RUN npm run build


