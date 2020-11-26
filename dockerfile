FROM node:14.8.0
WORKDIR /usr/src/app


COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
RUN yarn global add pm2

ARG PORT
EXPOSE ${PORT}

COPY . .

VOLUME ["/usr/src/app/store"]

CMD [ "yarn", "deploy" ]