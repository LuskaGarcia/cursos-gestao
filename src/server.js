require('dotenv').config();

const app = require('./app');
const prisma = require('./config/prisma');

const PORT = Number(process.env.PORT) || 3000;

function validarAmbiente() {
  const obrigatorias = ['DATABASE_URL', 'JWT_SECRET'];
  const ausentes = obrigatorias.filter((nome) => !process.env[nome]);

  if (ausentes.length > 0) {
    throw new Error(
      `Variáveis de ambiente ausentes: ${ausentes.join(', ')}. Consulte o .env.example.`
    );
  }
}

async function start() {
  validarAmbiente();

  await prisma.$connect();

  const server = app.listen(PORT, () => {
    console.log(`API disponível em http://localhost:${PORT}`);
  });

  async function shutdown(signal) {
    console.log(`\n${signal} recebido. Encerrando servidor...`);

    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch(async (error) => {
  console.error('Falha ao iniciar a API:', error);
  await prisma.$disconnect();
  process.exit(1);
});
