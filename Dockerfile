FROM debian:bullseye

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
RUN npm install mysql2

COPY . /app/


EXPOSE 3330

CMD ["node", "index.js"]
