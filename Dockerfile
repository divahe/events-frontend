FROM node:20-alpine AS build  

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . /app

RUN npm run build

FROM nginx:alpine 

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80