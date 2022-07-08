# создать образ на осонве образа ноды
FROM node:16-alpine

# создает папку 
RUN mkdir /server

# скопировать все нужные файлы в нашу папку в контейнере
COPY . /server

# Устанавливаем базовый путь для выполнения команд
WORKDIR /server

# устанавилваем зависимости
RUN npm i

# зададим переменную окружения
ENV PORT=5000 \
DB_URL=mongodb://db:27017/\
DB_NAME=test

# открываем порт в контейнее для внешнего подключения
EXPOSE 5000

# запускаем сервер
CMD npm run start