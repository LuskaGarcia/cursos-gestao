'use client';

export default function GlobalError({ error, reset }) {
  return (
    <main className="error-page">
      <section className="card error-card">
        <span className="eyebrow">Falha controlada</span>
        <h1>Não foi possível carregar os dados.</h1>
        <p className="muted">
          Verifique se a API Node.js está ligada e tente novamente.
        </p>

        {process.env.NODE_ENV === 'development' ? (
          <p className="form-error">{error?.message}</p>
        ) : null}

        <button className="button primary" type="button" onClick={() => reset()}>
          Tentar novamente
        </button>
      </section>
    </main>
  );
}
