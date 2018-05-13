FROM node

COPY package.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . ./src

WORKDIR /src

ENV PATH /src/node_modules/.bin:$PATH

EXPOSE 4200

CMD ng serve --host 0.0.0.0
