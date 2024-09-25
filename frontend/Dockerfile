FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_SALLING_GROUP_API_TOKEN
ARG VITE_SALLING_GROUP_API_URL

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (internal port)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]