FROM nginx:1.17.4-alpine

COPY nginx.conf /etc/nginx/conf.d

COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]