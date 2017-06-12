FROM nginx:alpine
COPY . /usr/share/nginx/html

HEALTHCHECK CMD wget -q localhost:80 -O /dev/null || exit 1