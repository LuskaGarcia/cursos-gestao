const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

async function listar() {
  return prisma.curso.findMany({
    orderBy: {
      titulo: 'asc',
    },
  });
}

async function buscarPorId(id) {
  const curso = await prisma.curso.findUnique({
    where: {
      id_curso: id,
    },
    include: {
      matriculas: {
        orderBy: {
          data_matricula: 'desc',
        },
        include: {
          colaborador: {
            select: {
              id_colaborador: true,
              nome: true,
              email: true,
              cargo_atual: true,
              setor: true,
            },
          },
          certificado: true,
        },
      },
    },
  });

  if (!curso) {
    throw new AppError('Curso não encontrado.', 404);
  }

  return curso;
}

async function criar(data) {
  return prisma.curso.create({
    data,
  });
}

async function atualizar(id, data) {
  const existe = await prisma.curso.findUnique({
    where: {
      id_curso: id,
    },
    select: {
      id_curso: true,
    },
  });

  if (!existe) {
    throw new AppError('Curso não encontrado.', 404);
  }

  return prisma.curso.update({
    where: {
      id_curso: id,
    },
    data,
  });
}

async function remover(id) {
  const curso = await prisma.curso.findUnique({
    where: {
      id_curso: id,
    },
    include: {
      _count: {
        select: {
          matriculas: true,
        },
      },
    },
  });

  if (!curso) {
    throw new AppError('Curso não encontrado.', 404);
  }

  if (curso._count.matriculas > 0) {
    throw new AppError(
      'Não é possível remover um curso que possui matrículas associadas.',
      409
    );
  }

  await prisma.curso.delete({
    where: {
      id_curso: id,
    },
  });
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};
