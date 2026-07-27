# gateway-service

The single public entry point for the whole app. The frontend only ever
calls the gateway; the gateway proxies each request to the right internal
microservice using `http-proxy-middleware`.

This is also the natural place to practice Kubernetes **Ingress**, load
balancing, and service discovery later — the gateway itself becomes the
Ingress backend, and its `config/routes.js` mirrors what your Ingress rules
or Service DNS names would look like.

## Route map

| Public path         | Proxies to             |
|----------------------|--------------------------|
| /api/auth/*           | auth-service              |
| /api/products/*       | product-service           |
| /api/categories/*     | product-service            |
| /api/cart/*            | cart-service                |
| /api/orders/*          | order-service                |
| /api/users/*            | user-service                  |
| /api/notifications/*    | notification-service           |

`GET /api/services` lists the live route map (handy for debugging service
discovery). `GET /health` is the gateway's own health check.

Targets are pulled from `credentials/config.js` -> `credentials/urls.json`,
so redeploying with a new IP/domain only requires editing that one file.
