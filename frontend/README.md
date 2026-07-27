# frontend

React (Vite) + Tailwind CSS storefront. Talks ONLY to `gateway-service` — never
directly to the other microservices.

## Run

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Single source of truth for the API URL

`vite.config.js` reads `../credentials/urls.json` at startup and injects
`GATEWAY_URL` into the app as `__GATEWAY_URL__`. `src/services/api.js` is the
only file that references it. To repoint the whole frontend at a new backend
(IP, domain, Kubernetes Ingress host), edit `credentials/urls.json` and
restart/rebuild — nothing in `src/` needs to change.

## Structure

```
src/
  components/   Navbar, Footer, ProductCard, ProtectedRoute, etc.
  context/      AuthContext, CartContext, ThemeContext (dark mode)
  pages/        Home, Products, ProductDetails, Cart, Checkout, Login, Register...
  pages/user/   Customer dashboard (Profile, Orders, Addresses, Wishlist)
  pages/admin/  Admin dashboard (stats, Products/Categories/Orders/Users CRUD)
  services/     Axios wrappers per microservice (authService, productService, ...)
```

## Admin login

Username `akash`, password `123` (hardcoded in auth-service as requested).
