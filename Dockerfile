# Specify a base image
FROM node:lts-alpine AS builder
WORKDIR /app
COPY reservation-app/package.json reservation-app/yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production
COPY reservation-app/ ./
RUN yarn build

FROM node:lts-alpine
WORKDIR '/usr/src/app'
# Install some depenendencies
COPY reservation-api/package.json reservation-api/yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production
COPY reservation-api/ ./
COPY --from=builder /app/build ./public

# Uses port which is used by the actual application
EXPOSE 5001

# Default command
CMD ["yarn", "run", "run-release"]