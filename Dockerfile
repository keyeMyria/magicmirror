FROM nginx:alpine

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.5.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz


COPY index.html /usr/share/nginx/html/index.html
COPY config.js.tpl /usr/share/nginx/html/config.js.tpl


CMD dockerize -template /usr/share/nginx/html/config.js.tpl:/usr/share/nginx/html/config.js nginx -g "daemon off;"


HEALTHCHECK CMD wget -q localhost:80 -O /dev/null || exit 1