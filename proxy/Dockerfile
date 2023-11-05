FROM nginx
RUN apt-get update -qq && apt-get -y install apache2-utils
ENV NODE_ROOT /var/www/front-web
WORKDIR $NODE_ROOT
RUN mkdir log
COPY app.conf /tmp/app.nginx
# Copy SSL certificate and private key files to the container
COPY certificate.crt /etc/nginx/ssl/certificate.crt
COPY privateKey.key /etc/nginx/ssl/privateKey.key
RUN envsubst '$NODE_ROOT' < /tmp/app.nginx > /etc/nginx/conf.d/default.conf
EXPOSE 2512
CMD [ "nginx", "-g", "daemon off;" ]