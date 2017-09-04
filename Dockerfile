FROM nginx:alpine

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.5.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN rm -r /usr/share/nginx/html/
COPY dist /usr/share/nginx/html
COPY config.json.tpl /usr/share/nginx/html/config.json.tpl


CMD dockerize -template /usr/share/nginx/html/config.json.tpl:/usr/share/nginx/html/config.json nginx -g "daemon off;"


HEALTHCHECK CMD wget -q localhost:80 -O /dev/null || exit 1