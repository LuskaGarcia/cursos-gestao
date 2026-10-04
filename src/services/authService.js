const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

function toDateOnly(value) {
  return new Date(`${value}T00:00:00.000Z`);
}

function publicColaborador(colaborador) {
  const { senha, ...safe } = colaborador;
  return safe;
}

async function register(data) {
  const email = data.email.toLowerCase();

  const existing = await prisma.colaborador.findFirst({
    where: {
      OR: [{ email }, { cpf: data.cpf }],
    },
    select: {
      id_colaborador: true,
      email: true,
      cpf: true,
    },
  });

  if (existing) {
    if (existing.email === email) {
      throw new AppError('E-mail já cadastrado.', 409);
    }

    throw new AppError('CPF já cadastrado.', 409);
  }

  const senhaHash = await bcrypt.hash(data.senha, 12);

  const colaborador = await prisma.colaborador.create({
    data: {
      nome: data.nome,
      cpf: data.cpf,
      email,
      senha: senhaHash,
      data_admissao: toDateOnly(data.data_admissao),
      cargo_atual: data.cargo_atual,
      setor: data.setor,
    },
  });

  return publicColaborador(colaborador);
}

async function login({ email, senha }) {
  const colaborador = await prisma.colaborador.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!colaborador) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const senhaValida = await bcrypt.compare(senha, colaborador.senha);

  if (!senhaValida) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const token = jwt.sign(
    {
      id_colaborador: colaborador.id_colaborador,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h',
    }
  );

  return {
    token,
    colaborador: publicColaborador(colaborador),
  };
}

module.exports = {
  register,
  login,
};
