# user-service

Owns the extended user profile: addresses, wishlist, and admin user
management (list/search/block). Basic identity (email/password) is owned by
auth-service.

## Endpoints
| Method | Route                      | Auth  | Description             |
|--------|-----------------------------|-------|---------------------------|
| GET    | /users/profile               | User  | Get my profile             |
| PUT    | /users/profile               | User  | Update name/phone          |
| POST   | /users/addresses              | User  | Add address                |
| DELETE | /users/addresses/:addressId  | User  | Remove address             |
| POST   | /users/wishlist/:productId    | User  | Toggle wishlist item       |
| GET    | /users/admin/all              | Admin | List/search users          |
| PUT    | /users/admin/:id/block        | Admin | Block / unblock a user     |
