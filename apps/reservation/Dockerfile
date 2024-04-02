FROM node:alpine AS developement

WORKDIR  /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build

FROM node:alpine AS production

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json .
COPY package-lock.json .

RUN npm i 

COPY --from=developement /usr/src/app/dist ./dist

CMD [ "node" , "dist/apps/reservation/main" ]