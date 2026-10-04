const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

function hojeUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

async function matricular(idColaborador, idCurso) {
  const curso = await prisma.curso.findUnique({
    where: {
      id_curso: idCurso,
    },
    select: {
      id_curso: true,
      titulo: true,
    },
  });

  if (!curso) {
    throw new AppError('Curso não encontrado.', 404);
  }

  const matriculaEmAberto = await prisma.matricula.findFirst({
    where: {
      id_colaborador: idColaborador,
      id_curso: idCurso,
      situacao: {
        in: ['EM_ANDAMENTO', 'CONCLUIDO'],
      },
    },
    select: {
      id_matricula: true,
      situacao: true,
    },
  });

  if (matriculaEmAberto) {
    throw new AppError(
      `O colaborador já possui matrícula ${matriculaEmAberto.situacao} neste curso.`,
      409
    );
  }

  return prisma.matricula.create({
    data: {
      data_matricula: hojeUTC(),
      data_conclusao: null,
      situacao: 'EM_ANDAMENTO',
      progresso: 0,
      id_colaborador: idColaborador,
      id_curso: idCurso,
      id_certificado: null,
    },
    include: {
      curso: true,
      certificado: true,
    },
  });
}

async function listarMinhas(idColaborador) {
  return prisma.matricula.findMany({
    where: {
      id_colaborador: idColaborador,
    },
    orderBy: {
      data_matricula: 'desc',
    },
    include: {
      curso: true,
      certificado: true,
    },
  });
}

module.exports = {
  matricular,
  listarMinhas,
};
