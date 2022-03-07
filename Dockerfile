FROM node:12 AS builder
#ENV NODE_ENV=production

RUN mkdir -p /app
WORKDIR /app
COPY . ./
RUN npm install && npm run build

#############################################

FROM httpd:2.4

WORKDIR /etc/apache2/sites-available/
COPY --from=builder /app/build /var/www/app/
COPY apache.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]
#CMD service apache2 restart
#CMD service apache2 restart && service apache2 status && apachectl configtest
