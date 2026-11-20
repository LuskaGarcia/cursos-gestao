'use client';

import { useActionState } from 'react';
import { enrollAction } from '@/app/actions/matriculas';
import FormSubmitButton from '@/components/form-submit-button';

const initialState = { erro: '', sucesso: '' };

export default function EnrollmentButton({ courseId }) {
  const action = enrollAction.bind(null, courseId);
  const [state, formAction] = useActionState(action, initialState);

  return (
    <div>
      <form action={formAction}>
        <FormSubmitButton pendingText="Matriculando...">
          Matricular-se
        </FormSubmitButton>
      </form>

      {state?.erro ? <p className="form-error">{state.erro}</p> : null}
      {state?.sucesso ? (
        <p className="notice" style={{ color: 'var(--success)' }}>
          {state.sucesso}
        </p>
      ) : null}
    </div>
  );
}
