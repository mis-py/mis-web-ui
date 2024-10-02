FROM node:alpine as build

COPY package.json package.json

RUN npm install

COPY . .

RUN npm build

FROM nginx:alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build default.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]