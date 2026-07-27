# RetailStore — Microservices E-Commerce Reference App

A 3-tier retail store application built as **independent microservices**, designed
specifically for practicing Docker, Kubernetes, Ingress, ConfigMaps, Secrets,
StatefulSets, service discovery, and horizontal scaling. No DevOps files are
included by design — this repo is application source code only.

## Architecture

```
RetailStore/
  credentials/            <- SINGLE SOURCE OF TRUTH for every URL + secret
    urls.json
    config.js
  shared/                 <- documentation only, not imported (see shared/README.md)
  gateway-service/        <- port 5000 - public entry point, proxies to every service
  auth-service/           <- port 5001 - register/login/JWT (+ hardcoded admin)
  product-service/        <- port 5002 - catalog, categories, auto-seeds 100+ products
  cart-service/           <- port 5003 - shopping cart
  order-service/          <- port 5004 - orders, admin stats
  user-service/           <- port 5005 - profile, addresses, wishlist, admin user mgmt
  notification-service/   <- port 5006 - in-app notifications (optional)
  frontend/               <- port 5173 - React (Vite) + Tailwind storefront
```

Every service has its own `package.json`, `server.js`, `models/`, `controllers/`,
`routes/`, `middlewares/`, `config/`, `.env.example`, and `README.md`. Services
share no code and no Express app — each can be containerized and deployed
completely independently.

## The one config file that controls everything

Edit **`credentials/urls.json`** and every service (backend + frontend) picks up
the new value automatically:

```json
{
  "GATEWAY_URL": "http://localhost:5000",
  "AUTH_SERVICE_URL": "http://localhost:5001",
  ...
}
```

Replace `localhost` with a real IP (`13.204.x.x`) or domain and redeploy — no
other file needs to change. Backend services read this via `credentials/config.js`;
the frontend reads it via `vite.config.js` at build/dev time.

## Running locally (without Kubernetes)

You'll need a MongoDB instance. For local dev without a 3-node replica set,
each service's `.env` can set `USE_LOCAL_MONGO=true` to fall back to
`mongodb://localhost:27017/retail-store`. In Kubernetes, the real
`MONGODB_URL` (replica set `rs0`, 3 nodes) from `urls.json` is used.

```bash
# 1. Start MongoDB somewhere reachable (local single-node mongod is fine for dev)

# 2. Start each backend service (each in its own terminal)
cd auth-service && cp .env.example .env && npm install && npm run dev
cd product-service && cp .env.example .env && npm install && npm run dev   # auto-seeds 100+ products
cd cart-service && cp .env.example .env && npm install && npm run dev
cd order-service && cp .env.example .env && npm install && npm run dev
cd user-service && cp .env.example .env && npm install && npm run dev
cd notification-service && cp .env.example .env && npm install && npm run dev
cd gateway-service && cp .env.example .env && npm install && npm run dev

# 3. Start the frontend
cd frontend && npm install && npm run dev
```

Visit **http://localhost:5173**.

## Admin login

```
Username: akash
Password: 123
```

## Sample data

`product-service` automatically seeds MongoDB on first connect (only if the
`products` collection is empty) with:
- 10 categories (Electronics, Fashion, Grocery, Beauty, Home & Kitchen, Sports,
  Books, Toys, Furniture, Accessories)
- 100+ realistic products with real brand/product names, realistic INR pricing,
  discounts, stock, ratings, and reviews
- Images served from the public Lorem Picsum CDN (no manual download needed)

Re-running services never creates duplicates — seeding checks `countDocuments()`
first.

## What to layer on top (intentionally not included here)

This repo is *only* application source code, ready for you to containerize and
deploy yourself as a DevOps exercise:
- Dockerfile per service
- docker-compose.yml for local multi-container dev
- Kubernetes manifests (Deployments, Services, StatefulSet for MongoDB,
  ConfigMaps/Secrets sourced from `credentials/urls.json`, Ingress)
- CI/CD pipeline (GitHub Actions / Jenkins)
- Horizontal Pod Autoscaler configs for load-testing horizontal scaling

## Tech stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios, dark mode, recharts
- **Backend:** Node.js, Express.js, MVC pattern per service
- **Database:** MongoDB + Mongoose (replica set `rs0` connection string ready)
- **Auth:** JWT + bcrypt, role-based (`customer` / `admin`)
