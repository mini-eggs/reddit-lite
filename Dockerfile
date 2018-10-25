FROM node:10

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .

CMD ["npm", "start"]