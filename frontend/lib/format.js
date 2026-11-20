export function formatDate(value) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
  }).format(new Date(value));
}

export function formatProgress(value) {
  const number = Number(value ?? 0);
  return `${Math.round(number)}%`;
}
