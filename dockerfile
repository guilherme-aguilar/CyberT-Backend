# Use a imagem oficial do Node.js como base
FROM node:20-alpine

# Instala o Git, wget e PM2
RUN apk update && \
    apk add --no-cache git wget && \
    npm install -g pnpm pm2

# Valida versões do pnpm, pm2 e node
RUN pnpm -v && \
    pm2 -v && \
    node -v

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o resto dos arquivos do projeto
COPY . .

# Instale as dependências do projeto
RUN pnpm install

# Gere o cliente Prisma
RUN pnpm prisma generate

# Compile o projeto TypeScript
RUN pnpm run build

# Exponha a porta que a aplicação vai usar
EXPOSE 8400

# Comando para iniciar a aplicação usando PM2
CMD ["pm2-runtime", "pnpm", "--", "run", "start:prod"]
