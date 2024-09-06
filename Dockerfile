# Base Stage
FROM node:18-slim as base

# Install necessary packages
RUN apt-get update && apt-get install -y \
  sqlite3 libsqlite3-dev \
  tesseract-ocr tesseract-ocr-por python3 python3-pip \
  libpixman-1-dev libcairo2-dev build-essential \
  libjpeg-dev zlib1g-dev libffi-dev \
  libpango-1.0-0 libpango1.0-dev \
  libgdk-pixbuf2.0-0 libgif-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /home/node

# Expose default Strapi port
EXPOSE 1337

# Copy package.json and yarn.lock first to leverage caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn --immutable --prefer-offline

# Copy all source files
COPY . .

###########
### DEV ###
###########

FROM base as dev

# Install dev dependencies
RUN yarn install --immutable --prefer-offline

# Development command
CMD [ "yarn", "develop" ]

#############
### CLOUD ###
#############

FROM base as cloud

# Set environment to production
ENV NODE_ENV production

# Remove unnecessary sync config files
RUN rm -f config/sync/core-store.plugin_users-permissions_advanced.json \
       config/sync/core-store.plugin_users-permissions_email.json

# Remove test files and other unneeded files in production
RUN rm -rf ./tests

# Install only production dependencies
RUN yarn install --immutable --prefer-offline --production

# Define the entrypoint script
ENTRYPOINT [ "/home/node/entrypoint.sh" ]

# Run the application (consider running migrations before starting the app)
CMD [ "sh", "-c", "yarn cs:import -y && yarn start" ]
