const { z } = require('zod');

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use o formato YYYY-MM-DD.')
  .refine((value) => !Number.isNaN(new Date(`${value}T00:00:00.000Z`).getTime()), {
    message: 'Data inválida.',
  });

const registerSchema = z.object({
  nome: z.string().trim().min(2).max(50),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve usar o formato 000.000.000-00.'),
  email: z.string().trim().email().max(100),
  senha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.').max(72),
  data_admissao: dateString,
  cargo_atual: z.string().trim().min(2).max(20),
  setor: z.string().trim().min(2).max(20),
});

const loginSchema = z.object({
  email: z.string().trim().email().max(100),
  senha: z.string().min(1, 'Senha é obrigatória.'),
});

module.exports = {
  registerSchema,
  loginSchema,
};
