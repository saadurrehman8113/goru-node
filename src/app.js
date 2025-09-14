import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import createError from 'http-errors';

import config from './configurations/env.js';
import { MESSAGES } from './constants/index.js';
import v1Router from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/error.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './configurations/swagger.js';

const app = express();

// Security and common middlewares
app.use(helmet());
app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(compression());

// Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan(config.logLevel));

// Health and API routes
app.get('/health', (req, res) => {
  res
    .status(200)
    .json({ message: MESSAGES.HEALTH_OK, data: { status: 'ok', uptime: process.uptime() } });
});

// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api', v1Router);

// 404 handler for unmatched routes
app.use((req, res, next) => {
  next(createError(404, 'Resource not found'));
});

// Global error handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
