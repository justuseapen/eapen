FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY portrait.jpg /usr/share/nginx/html/portrait.jpg
COPY assets/*.webp assets/*.svg assets/social-card.png /usr/share/nginx/html/assets/
COPY assets/workshop/ /usr/share/nginx/html/assets/workshop/
COPY styles/*.css /usr/share/nginx/html/styles/
# Keep operational scripts (such as autopost.py) outside the public image.
COPY scripts/site.js scripts/workshop-demo.js scripts/workshop-policy.js scripts/workshop-navigation.js /usr/share/nginx/html/scripts/
COPY robots.txt sitemap.xml /usr/share/nginx/html/
COPY essays/*.html /usr/share/nginx/html/essays/
COPY work/*.html /usr/share/nginx/html/work/
