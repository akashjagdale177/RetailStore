# product-service

Owns the product catalog and categories. Auto-seeds MongoDB with 10 categories
and 100+ realistic products (real product names/brands/prices, images served
from the public Lorem Picsum CDN) the first time it connects to an empty
database. Safe to restart — seeding is idempotent.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

Force a manual reseed check: `npm run seed`

## Endpoints

| Method | Route                     | Auth        | Description                    |
|--------|---------------------------|-------------|---------------------------------|
| GET    | /products                 | Public      | List/search/filter/paginate     |
| GET    | /products/:id             | Public      | Product details + related items |
| POST   | /products                 | Admin       | Create product                  |
| PUT    | /products/:id             | Admin       | Update product                  |
| DELETE | /products/:id             | Admin       | Delete product                  |
| POST   | /products/:id/reviews     | Logged-in   | Add a review                    |
| GET    | /categories               | Public      | List categories                 |
| POST   | /categories               | Admin       | Create category                 |
| PUT    | /categories/:id           | Admin       | Update category                 |
| DELETE | /categories/:id           | Admin       | Delete category                 |

Query params for `GET /products`: `search`, `category`, `minPrice`, `maxPrice`,
`sort` (newest | priceLowToHigh | priceHighToLow | rating), `page`, `limit`.
