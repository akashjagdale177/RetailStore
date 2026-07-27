# auth-service

Handles registration, login (including the hardcoded admin `akash` / `123`), JWT
issuance/verification, and password hashing (bcrypt). Owns the `users` auth
identity collection.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

## Endpoints

| Method | Route      | Description               |
|--------|-----------|----------------------------|
| POST   | /register | Register a new customer    |
| POST   | /login    | Login (customer or admin)  |
| POST   | /logout   | Logout (stateless)         |
| GET    | /me       | Get current user (JWT)     |
| GET    | /health   | Health check                |

Configuration is pulled from `../credentials/config.js` — never hardcode URLs here.
