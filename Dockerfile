FROM node:12.6 as builder
WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build


FROM node:12.6 as runner
WORKDIR /home/node/app
ENV NODE_ENV production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --from=builder /home/node/app/dist ./
COPY ormconfig.js docker-entrypoint.sh ./
ENTRYPOINT ["/home/node/app/docker-entrypoint.sh"]
CMD ["node", "server.js"]
