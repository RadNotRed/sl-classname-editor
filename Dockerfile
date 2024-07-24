FROM node:lts
WORKDIR /home/rad/sl-classname-editor/

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "9000"]

EXPOSE 9000
