FROM node:lts-alpine as builder

WORKDIR /build

ADD package.json .

RUN npm install

ADD . .

RUN npm run build


FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /build .

RUN npm link
RUN npm prune --production

ENTRYPOINT [ "/usr/local/bin/chatwork-api-client" ]
