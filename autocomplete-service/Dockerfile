FROM node:10

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --silent && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
