FROM node:12.18.2-alpine3.12

COPY ./frontend /frontend

WORKDIR /frontend

RUN yarn

EXPOSE 3000

ENV CI true

CMD yarn start
