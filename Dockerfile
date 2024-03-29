FROM node:14.17.5-alpine

WORKDIR /usr/src/app
RUN chown node:node /usr/src/app

USER node

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

CMD tail -f /dev/null
