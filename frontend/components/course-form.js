'use client';

import { useActionState } from 'react';
import FormSubmitButton from '@/components/form-submit-button';

const initialState = { erro: '', detalhes: [] };

export default function CourseForm({
  action,
  course,
  submitLabel = 'Salvar curso',
}) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="form-card form-grid">
      <div className="full">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          name="titulo"
          defaultValue={course?.titulo ?? ''}
          required
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="area_conhecimento">Área de conhecimento</label>
        <input
          id="area_conhecimento"
          name="area_conhecimento"
          defaultValue={course?.area_conhecimento ?? ''}
          required
          maxLength={50}
        />
      </div>

      <div>
        <label htmlFor="carga_horaria">Carga horária</label>
        <input
          id="carga_horaria"
          name="carga_horaria"
          type="number"
          min="1"
          defaultValue={course?.carga_horaria ?? ''}
          required
        />
      </div>

      <div className="full">
        <label htmlFor="conteudo_programatico">Conteúdo programático</label>
        <textarea
          id="conteudo_programatico"
          name="conteudo_programatico"
          defaultValue={course?.conteudo_programatico ?? ''}
          required
          maxLength={500}
        />
      </div>

      <div className="full">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          defaultValue={course?.descricao ?? ''}
          required
          maxLength={500}
        />
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
        <FormSubmitButton pendingText="Salvando...">
          {submitLabel}
        </FormSubmitButton>
      </div>
    </form>
  );
}
