# Backend API Spec for Frontend

Базовый URL (по умолчанию во фронтенде): `http://localhost:8000/api`

Все ответы и запросы в формате JSON.

## 1) Регистрация пользователя

### `POST /auth/register`

Назначение: создать пользователя и вернуть данные авторизации.

Request body:

```json
{
  "name": "Ivan Petrov",
  "email": "ivan@example.com",
  "password": "secret123"
}
```

Validation:
- `name`: string, min 2, max 100
- `email`: valid email, unique
- `password`: string, min 6

Success response (201):

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Ivan Petrov",
    "email": "ivan@example.com",
    "createdAt": "2026-04-27T08:00:00.000Z"
  },
  "token": "jwt-token-string"
}
```

Error response (400/409):

```json
{
  "error": "Email already exists"
}
```

## 2) Создание категории

### `POST /categories`

Назначение: создать категорию товара.

Headers:
- `Authorization: Bearer <token>`

Request body:

```json
{
  "name": "Laptops",
  "description": "Portable computers"
}
```

Validation:
- `name`: string, min 2, max 100, unique
- `description`: string, min 3, max 500

Success response (201):

```json
{
  "message": "Category created",
  "category": {
    "id": 10,
    "name": "Laptops",
    "description": "Portable computers",
    "createdAt": "2026-04-27T08:15:00.000Z"
  }
}
```

Error response (400/401/409):

```json
{
  "error": "Unauthorized"
}
```

## 3) Создание товара

### `POST /products`

Назначение: создать товар и привязать к категории.

Headers:
- `Authorization: Bearer <token>`

Request body:

```json
{
  "title": "MacBook Pro 14",
  "description": "16GB RAM, 512GB SSD",
  "price": 2499.99,
  "categoryId": 10
}
```

Validation:
- `title`: string, min 2, max 140
- `description`: string, min 3, max 1000
- `price`: number, greater than 0
- `categoryId`: integer, must exist in categories table

Success response (201):

```json
{
  "message": "Product created",
  "product": {
    "id": 100,
    "title": "MacBook Pro 14",
    "description": "16GB RAM, 512GB SSD",
    "price": 2499.99,
    "categoryId": 10,
    "createdAt": "2026-04-27T08:20:00.000Z"
  }
}
```

Error response (400/401/404):

```json
{
  "error": "Category not found"
}
```

## Единый формат ошибок (рекомендуется)

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Дополнительно рекомендуется реализовать

- `POST /auth/login` для получения токена существующим пользователем.
- `GET /categories` для выбора категории из списка вместо ручного ввода `categoryId`.
- `GET /products` для отображения списка созданных товаров.
