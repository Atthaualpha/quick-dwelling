FROM node

COPY package.json ./

RUN npm install

RUN npm install -g nodemon

COPY . ./src

WORKDIR /src

ENV PATH /src/node_modules/.bin:$PATH

EXPOSE 4028

CMD npm start