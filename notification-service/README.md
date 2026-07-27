# notification-service (optional)

Stores in-app notifications (order updates, account events). Designed so a
`POST /notifications` call can later be wired into a real email/SMS provider
without changing its API shape.

## Endpoints
| Method | Route              | Description                  |
|--------|---------------------|-------------------------------|
| POST   | /notifications        | Create a notification (internal) |
| GET    | /notifications        | Get my notifications             |
| PUT    | /notifications/:id/read | Mark as read                    |
