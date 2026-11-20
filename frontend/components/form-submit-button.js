'use client';

import { useFormStatus } from 'react-dom';

export default function FormSubmitButton({
  children,
  pendingText = 'Enviando...',
  className = 'button primary',
}) {
  const { pending } = useFormStatus();

  return (
    <button className={className} type="submit" disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
