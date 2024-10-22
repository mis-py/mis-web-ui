FROM node:alpine as build

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /build /usr/share/nginx/html
COPY --from=build default.conf /etc/nginx/conf.d/default.conf

RUN ls /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]