# Build Application
FROM node:12-alpine as build

RUN npm install react-scripts@3.0.1 -g --silent

WORKDIR /app

COPY package.json .
RUN npm install --silent

COPY . .
RUN npm run build




# Production NGINX
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]