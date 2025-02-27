# Etapa 1: Build da Aplicação
FROM node:18.20.4-slim AS build

# Diretório de trabalho
WORKDIR /usr/src/app

# Instalar dependências essenciais
RUN apt-get update && apt-get install -y \
  python3 \
  build-essential \
  libpq-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Copiar arquivos necessários
COPY package*.json ./

# Instalar dependências com npm
RUN npm install

# Copiar o restante do projeto
COPY . .

# Build (caso necessário, ajuste conforme seu projeto)
RUN npm run build

# Etapa 2: Runtime
FROM node:18.20.4-slim

# Diretório de trabalho
WORKDIR /usr/src/app

# Instalar dependências essenciais
RUN apt-get update && apt-get install -y \
  libpq-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Copiar arquivos necessários da etapa de build
COPY --from=build /usr/src/app ./

# Definir variáveis de ambiente
ENV NODE_ENV=development
ENV DATABASE_CLIENT=postgres
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV JWT_SECRET=${JWT_SECRET}
ENV ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
ENV APP_KEYS=${APP_KEYS}

# Expor a porta padrão do Strapi
EXPOSE 1337

# Comando para iniciar o Strapi
CMD ["npm", "run", "develop"]
