require('dotenv').config();

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.status(200).json({
    mensagem: 'API de Capacitação Corporativa',
    versao: '1.0.0',
    health: '/api/health',
  });
});

app.use('/api', routes);

app.use((req, _res, next) => {
  next(new AppError(`Rota não encontrada: ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
