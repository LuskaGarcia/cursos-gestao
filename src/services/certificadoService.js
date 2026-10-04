const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

const includeRelacionamentos = {
  matricula: {
    include: {
      curso: true,
      colaborador: {
        select: {
          id_colaborador: true,
          nome: true,
          email: true,
          cargo_atual: true,
          setor: true,
        },
      },
    },
  },
};

async function listar() {
  return prisma.certificado.findMany({
    orderBy: {
      data_emissao: 'desc',
    },
    include: includeRelacionamentos,
  });
}

async function buscarPorIdOuCodigo(identificador) {
  const idNumerico = Number(identificador);
  const filtros = [{ codigo_autenticacao: identificador }];

  if (Number.isInteger(idNumerico) && idNumerico > 0) {
    filtros.unshift({ id_certificado: idNumerico });
  }

  const certificado = await prisma.certificado.findFirst({
    where: {
      OR: filtros,
    },
    include: includeRelacionamentos,
  });

  if (!certificado) {
    throw new AppError('Certificado não encontrado ou código inválido.', 404);
  }

  return {
    ...certificado,
    autentico: true,
  };
}

module.exports = {
  listar,
  buscarPorIdOuCodigo,
};
