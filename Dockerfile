FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY essays/ /usr/share/nginx/html/essays/
