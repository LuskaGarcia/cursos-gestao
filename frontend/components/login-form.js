'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import FormSubmitButton from '@/components/form-submit-button';

const initialState = { erro: '' };

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="form-card">
      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="senha">Senha</label>
        <input id="senha" name="senha" type="password" required />
      </div>

      {state?.erro ? <p className="form-error">{state.erro}</p> : null}

      <FormSubmitButton pendingText="Entrando...">Entrar</FormSubmitButton>
    </form>
  );
}
