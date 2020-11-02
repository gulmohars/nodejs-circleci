# FROM node:10.15.3-alpine
# WORKDIR '/app'
# COPY ./package.json ./
# RUN npm install
# COPY ./ ./
# CMD ["npm", "run", "start"]


FROM node:alpine

# Create app directory
WORKDIR /app
# WORKDIR /opt/app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["npm","run","start"]