FROM mhart/alpine-node:6

WORKDIR /src
ADD . .

RUN npm install

ENV NODE_ENV "production"

# Build the frontend bundle too
RUN npm run frontend

CMD ["node", "server.js"]