FROM node

COPY package.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . ./src

WORKDIR /src

EXPOSE 4200

CMD ng serve
