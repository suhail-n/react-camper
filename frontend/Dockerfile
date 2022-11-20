FROM node:14-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

VOLUME [ "/app/node_modules" ]

EXPOSE 3000

# CMD [ "node", "app.js" ]
# after adding nodemon with a start script
CMD [ "npm", "start"]