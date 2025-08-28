FROM node:20.17-alpine
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
