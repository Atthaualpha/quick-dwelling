FROM node

COPY package.json ./

RUN npm install

COPY . ./src

WORKDIR /src

ENV PATH /src/node_modules/.bin:$PATH

EXPOSE 4028

CMD npm start