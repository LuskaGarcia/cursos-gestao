import Link from 'next/link';
import SiteHeader from '@/components/site-header';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <span className="eyebrow">Capacitação corporativa</span>
          <h1>Gerencie cursos e acompanhe suas matrículas em um só lugar.</h1>
          <p>
            A segunda etapa conecta o front-end Next.js ao back-end Node.js
            desenvolvido na primeira entrega.
          </p>
          <div className="actions">
            <Link className="button primary" href="/login">
              Entrar
            </Link>
            <Link className="button ghost" href="/cadastro">
              Criar conta
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
