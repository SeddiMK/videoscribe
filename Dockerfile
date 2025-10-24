# ==========================================
# Stage 1: Base image
# ==========================================
FROM node:22-bullseye-slim AS base

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# Stage 2: Install production dependencies
# ==========================================
FROM base AS deps
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# ==========================================
# Stage 3: Build application
# ==========================================
FROM base AS builder
WORKDIR /app

# Копируем package files
COPY package.json package-lock.json ./

# Устанавливаем все зависимости (включая dev)
RUN npm ci --ignore-scripts

# Копируем исходный код
COPY . .

# Сборка приложения
RUN npm run build

# ==========================================
# Stage 4: Production image with Nginx
# ==========================================
FROM nginx:alpine AS runner

# Метаданные
LABEL maintainer="VideoScribe Team"
LABEL description="VideoScribe - Video to Text Transcription Service"

# Устанавливаем дополнительные пакеты
RUN apk add --no-cache \
    curl \
    tzdata

# Устанавливаем timezone
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Создаём директории
RUN mkdir -p /app/uploads /app/results /app/logs && \
    chown -R nginx:nginx /app

WORKDIR /usr/share/nginx/html

# Копируем собранное приложение из builder stage
COPY --from=builder /app/dist .

# Копируем конфигурацию nginx для контейнера
COPY nginx.container.conf /etc/nginx/conf.d/default.conf

# Удаляем дефолтную конфигурацию nginx
RUN rm -f /etc/nginx/nginx.conf

# Создаём оптимизированный nginx.conf
RUN cat > /etc/nginx/nginx.conf <<'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Логи
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;

    # Производительность
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;

    # Подключаем конфигурации сайтов
    include /etc/nginx/conf.d/*.conf;
}
EOF

# Health check script
RUN cat > /usr/local/bin/healthcheck.sh <<'EOF'
#!/bin/sh
curl -f http://localhost/health || exit 1
EOF

RUN chmod +x /usr/local/bin/healthcheck.sh

# Открываем порт
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD /usr/local/bin/healthcheck.sh

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
