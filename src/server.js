import http from 'http';
import app from './app.js';
import config from './config/env.js';

const server = http.createServer(app);

server.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${config.port} (${config.env})`);
});

// Graceful shutdown
const shutdown = (signal) => {
  // eslint-disable-next-line no-console
  console.log(`Received ${signal}. Closing server...`);
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Server closed');
    process.exit(0);
  });
  // Force close after 10s
  setTimeout(() => process.exit(1), 10000).unref();
};

['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, () => shutdown(sig)));
