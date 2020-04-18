FROM node:12
WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
COPY docker/debug/docker-entrypoint.sh ./docker-entrypoint.sh
ENTRYPOINT ["/home/node/app/docker-entrypoint.sh"]
CMD ["yarn", "watch-server"]
