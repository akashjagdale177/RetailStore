# shared/

This folder is **documentation only** — it is not imported by any service at runtime.

Per the architecture rules for this project, every microservice must be able to be
containerized and deployed completely independently (its own Docker image, its own
Kubernetes Deployment). That means services do **not** import a shared `node_modules`
package or a shared Express app.

Instead, small cross-cutting patterns (error handler shape, async wrapper, response
envelope) are **duplicated on purpose** into each service's own `middlewares/` and
`utils/` folders. This is a deliberate trade-off:

- ✅ Each service can be copied out, containerized, and deployed alone
- ✅ No version-lock between services
- ✅ Matches real-world polyglot-microservice practice
- ⚠️ If you change the error format, update it in each service

The only thing that IS truly shared and single-sourced across every service and the
frontend is `credentials/urls.json` (see that file's comment header).

## Common response envelope used by every service

```json
{ "success": true, "data": {}, "message": "" }
{ "success": false, "message": "Error description" }
```

## Common error handler shape (duplicated in every service's middlewares/errorHandler.js)

Catches thrown errors, Mongoose validation errors, and JWT errors, and always
responds with the envelope above and the correct HTTP status code.
