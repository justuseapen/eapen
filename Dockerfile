FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY portrait.jpg /usr/share/nginx/html/portrait.jpg
COPY assets/*.webp assets/*.svg assets/social-card.png /usr/share/nginx/html/assets/
COPY robots.txt sitemap.xml /usr/share/nginx/html/
COPY essays/ /usr/share/nginx/html/essays/
