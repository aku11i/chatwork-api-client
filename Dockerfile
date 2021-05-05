FROM node:16-alpine as builder

WORKDIR /build

ADD package.json .
ADD package-lock.json .

RUN npm ci

ADD . .

RUN npm run build


FROM node:16-alpine

WORKDIR /app

COPY --from=builder /build .

RUN npm link
RUN npm prune --production

ENTRYPOINT [ "/usr/local/bin/chatwork-api-client" ]
