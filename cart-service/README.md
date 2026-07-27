# cart-service

Manages each logged-in user's shopping cart (add / update quantity / remove / clear).

## Endpoints
| Method | Route            | Description             |
|--------|-------------------|--------------------------|
| GET    | /cart             | Get current user's cart |
| POST   | /cart             | Add item to cart         |
| PUT    | /cart/:productId  | Update item quantity     |
| DELETE | /cart/:productId  | Remove item               |
| DELETE | /cart             | Clear cart                |

All routes require `Authorization: Bearer <token>`.
