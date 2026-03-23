# Задание 1: MongoDB (CRUD, фильтры, массивы, upsert)

## Запуск

```bash
cd task-1-mongodb
docker compose up -d
docker ps   # контейнеры mng и mnge
```

Веб-интерфейс: [http://localhost:8081](http://localhost:8081) (логин/пароль root / `password123`).

Подключение к shell:

```bash
docker exec -it mng mongosh -u root -p password123 --authenticationDatabase admin
```

## Импорт `products.json` (альтернатива скрипту)

```bash
docker cp products.json mng:/products.json
docker exec -it mng mongoimport --db shop --collection products --file /products.json --jsonArray -u root -p password123 --authenticationDatabase admin
```

## Решение (подготовка + части 1 и 2)

Скрипт сбрасывает коллекцию `products`, вставляет исходные 6 товаров и выполняет все пункты задания по порядку:

```bash
docker cp full-solution.mongosh.js mng:/full-solution.mongosh.js
docker exec -it mng mongosh -u root -p password123 --authenticationDatabase admin --file /full-solution.mongosh.js
```

Либо с хоста (если установлен `mongosh` и порт 27017 открыт):

```bash
mongosh "mongodb://root:password123@127.0.0.1:27017/admin" --file full-solution.mongosh.js
```

Отдельные файлы с командами для ручного копирования в `mongosh`: см. `queries-reference.mongosh.js`.

## Кратко по пунктам

| Раздел | Содержание |
|--------|------------|
| Подготовка | БД `shop`, коллекция `products`, данные из `products.json` |
| Часть 1 | Create / Read / Update / Delete по условиям задания |
| Часть 2 | Сложный фильтр, `$push` в массив, `upsert`, очистка `test_delete` |
