FROM nginx:alpine
COPY . /usr/share/nginx/html

HEALTHCHECK --interval=5m --timeout=3s \
  CMD wget -q localhost:80 -O /dev/null || exit 1