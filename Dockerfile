FROM nginx
WORKDIR /usr/share/react

RUN curl -fsSl https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
# install app dependencies
COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

#RUN rm -r /usr/share/ngnix/html/*

RUN cp -a build/. /usr/share/nginx/html

EXPOSE 5077:5000