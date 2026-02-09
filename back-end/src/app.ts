import fastify from 'fastify';
import cors from '@fastify/cors';
import { mainRoutes } from './http/routes/main-route.js';

export const app = fastify();

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
});

app.register(mainRoutes, {
  prefix: '/api',
});
