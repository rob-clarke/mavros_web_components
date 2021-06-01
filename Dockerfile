FROM node

RUN npm install http-server -g

COPY package.json /usr/src/mavros_web/package.json
COPY package-lock.json /usr/src/mavros_web/package-lock.json

WORKDIR /usr/src/mavros_web

RUN npm install

COPY . /usr/src/mavros_web

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "static", "-p", "8080" ]