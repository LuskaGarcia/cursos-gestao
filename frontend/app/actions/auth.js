'use server';

import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/session';
import { loginApi, registerApi } from '@/lib/api';

export async function loginAction(_prevState, formData) {
  const email = String(formData.get('email') || '').trim();
  const senha = String(formData.get('senha') || '');

  if (!email || !senha) {
    return { erro: 'Informe e-mail e senha.' };
  }

  const result = await loginApi(email, senha);

  if (!result.ok) {
    return {
      erro:
        result.data?.erro ||
        result.data?.mensagem ||
        'Não foi possível realizar o login.',
    };
  }

  await createSession(result.data.token);
  redirect('/dashboard');
}

export async function registerAction(_prevState, formData) {
  const payload = {
    nome: String(formData.get('nome') || '').trim(),
    cpf: String(formData.get('cpf') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    senha: String(formData.get('senha') || ''),
    data_admissao: String(formData.get('data_admissao') || ''),
    cargo_atual: String(formData.get('cargo_atual') || '').trim(),
    setor: String(formData.get('setor') || '').trim(),
  };

  const result = await registerApi(payload);

  if (!result.ok) {
    return {
      erro:
        result.data?.erro ||
        result.data?.mensagem ||
        'Não foi possível concluir o cadastro.',
      detalhes: result.data?.detalhes || [],
    };
  }

  const loginResult = await loginApi(payload.email, payload.senha);

  if (!loginResult.ok) {
    return {
      erro: 'Cadastro concluído, mas não foi possível entrar automaticamente.',
    };
  }

  await createSession(loginResult.data.token);
  redirect('/dashboard');
}

export async function logoutAction() {
  await deleteSession();
  redirect('/login');
}
