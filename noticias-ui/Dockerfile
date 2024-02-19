# Stage 1
FROM node:14 as build-stage

WORKDIR /noticias-ui
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /noticias-ui/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf  
COPY nginx.conf /etc/nginx/conf.d

EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
