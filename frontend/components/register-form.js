'use client';

import { useActionState } from 'react';
import { registerAction } from '@/app/actions/auth';
import FormSubmitButton from '@/components/form-submit-button';

const initialState = { erro: '', detalhes: [] };

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className="form-card form-grid">
      <div className="full">
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" required maxLength={50} />
      </div>

      <div>
        <label htmlFor="cpf">CPF</label>
        <input
          id="cpf"
          name="cpf"
          placeholder="000.000.000-00"
          required
          maxLength={14}
        />
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="senha">Senha</label>
        <input id="senha" name="senha" type="password" minLength={8} required />
      </div>

      <div>
        <label htmlFor="data_admissao">Data de admissão</label>
        <input id="data_admissao" name="data_admissao" type="date" required />
      </div>

      <div>
        <label htmlFor="cargo_atual">Cargo atual</label>
        <input id="cargo_atual" name="cargo_atual" required maxLength={20} />
      </div>

      <div>
        <label htmlFor="setor">Setor</label>
        <input id="setor" name="setor" required maxLength={20} />
      </div>

      {state?.erro ? (
        <div className="full">
          <p className="form-error">{state.erro}</p>
          {state.detalhes?.length ? (
            <ul className="form-error-list">
              {state.detalhes.map((item, index) => (
                <li key={`${item.campo}-${index}`}>
                  {item.campo}: {item.mensagem}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="full">
        <FormSubmitButton pendingText="Cadastrando...">
          Criar conta
        </FormSubmitButton>
      </div>
    </form>
  );
}
