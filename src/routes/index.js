const express = require('express');
const authRoutes = require('./authRoutes');
const cursoRoutes = require('./cursoRoutes');
const certificadoRoutes = require('./certificadoRoutes');
const matriculaRoutes = require('./matriculaRoutes');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    servico: 'capacitacao-backend-etapa1',
  });
});

router.use('/auth', authRoutes);
router.use('/cursos', cursoRoutes);
router.use('/certificados', certificadoRoutes);
router.use('/matriculas', matriculaRoutes);

module.exports = router;
