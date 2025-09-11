# goru-node

Modular Express.js boilerplate following best practices.

## Quick start

1. Copy `.env.example` to `.env` and adjust as needed
2. Install dependencies: `npm install`
3. Start in development: `npm run dev`

## Scripts

- `npm run dev` - start with nodemon
- `npm start` - production start
- `npm run lint` - run ESLint
- `npm run format` - format with Prettier

## Project structure

```
src/
  app.js            # Express app and middleware
  server.js         # HTTP server and lifecycle
  config/
    env.js          # Environment and config
  middleware/
    error.js        # Error handlers
  routes/
    v1/
      index.js      # API v1 router
  utils/
    asyncHandler.js # Async wrapper
  modules/
    users/
      user.routes.js
      user.controller.js
      user.service.js
      user.validation.js
```

## Conventions

- API routes versioned under `/api/v1`
- Validation with Joi per module
- Controllers call services; services are stateless and reusable
