FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY portrait.jpg /usr/share/nginx/html/portrait.jpg
COPY essays/ /usr/share/nginx/html/essays/
