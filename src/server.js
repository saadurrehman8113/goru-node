import http from 'http';
import app from './app.js';
import config from './configurations/env.js';
import { connectDatabase, disconnectDatabase } from './configurations/database.js';

const server = http.createServer(app);

// Start server after DB connection
connectDatabase()
  .then(() => {
    server.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${config.port} (${config.env})`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start server due to DB connection error:', err);
    process.exit(1);
  });

// Graceful shutdown
const shutdown = async (signal) => {
  // eslint-disable-next-line no-console
  console.log(`Received ${signal}. Closing server...`);

  // Stop accepting new connections
  await new Promise((resolve) => server.close(resolve));
  // eslint-disable-next-line no-console
  console.log('HTTP server closed');

  try {
    await disconnectDatabase();
    // eslint-disable-next-line no-console
    console.log('Database disconnected');
    process.exit(0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error during shutdown:', err);
    process.exit(1);
  }

  // Force close after 10s
  setTimeout(() => process.exit(1), 10000).unref();
};

['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, () => shutdown(sig)));
