import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="error-page">
      <section className="card error-card">
        <span className="eyebrow">404</span>
        <h1>Conteúdo não encontrado.</h1>
        <p className="muted">
          O recurso solicitado não existe ou foi removido.
        </p>
        <Link className="button primary" href="/dashboard">
          Voltar ao painel
        </Link>
      </section>
    </main>
  );
}
