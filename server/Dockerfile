FROM node:alpine AS auth

WORKDIR /app

COPY package.json ./

RUN yarn install --omit=dev

COPY ./ ./

EXPOSE 5555

CMD yarn run start:dev
