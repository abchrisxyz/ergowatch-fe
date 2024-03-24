FROM node:21-alpine AS build
WORKDIR /app
# The build expects a .env to be present - see README.md
COPY . .
RUN npm ci
RUN npm run build
RUN mkdir ./release && mv build ./release/ && mv package*.json ./release 

FROM node:21-alpine
WORKDIR /app
COPY --from=build /app/release /app
RUN ls
RUN npm ci --omit dev  
USER node:node
# https://kit.svelte.dev/docs/adapter-node#environment-variables-port-and-host
ENV PORT=3000
EXPOSE ${PORT}
CMD ["node","build"]
