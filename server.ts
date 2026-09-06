import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import apiRouter from './server/routes/api';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logger for observability
  app.use((req, res, next) => {
    if (req.url.startsWith('/api') || req.url.startsWith('/health')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
  });

  // Health route directly at /health as well as /api/health
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      api: true,
      database: true,
      model: true,
      model_version: 'cardiffnlp/twitter-roberta-base-sentiment',
      timestamp: new Date().toISOString()
    });
  });

  // Mount API router
  app.use('/api', apiRouter);

  // Vite middleware for development / SPA serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SocialIQ Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
