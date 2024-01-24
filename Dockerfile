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
EXPOSE 80
CMD ["node","build"]
