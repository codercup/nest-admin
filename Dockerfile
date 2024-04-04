FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com
RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN npm run build

FROM node:18-alpine as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com
RUN npm i -g pnpm
RUN pnpm i --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
