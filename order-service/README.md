# order-service

Handles order placement, order history, admin order/status management, and
basic revenue stats for the admin dashboard.

## Endpoints
| Method | Route              | Auth  | Description                     |
|--------|--------------------|-------|-----------------------------------|
| POST   | /orders            | User  | Place an order                    |
| GET    | /orders            | User  | Get my orders                     |
| GET    | /orders/:id        | User  | Get single order                  |
| GET    | /orders/admin/all  | Admin | All orders (paginated)            |
| GET    | /orders/admin/stats| Admin | Revenue + recent orders            |
| PUT    | /orders/:id/status | Admin | Update shipping/payment status     |
