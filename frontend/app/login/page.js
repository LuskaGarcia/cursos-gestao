import Link from 'next/link';
import LoginForm from '@/components/login-form';

export const metadata = {
  title: 'Login',
};

export default async function LoginPage({ searchParams }) {
  const query = await searchParams;
  const sessionExpired = query?.erro === 'sessao-expirada';

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="back-link" href="/">
          ← Voltar
        </Link>
        <span className="eyebrow">Área restrita</span>
        <h1>Entrar</h1>
        <p>Use o colaborador cadastrado no back-end.</p>

        {sessionExpired ? (
          <p className="notice warning">
            Sua sessão não é mais válida. Faça login novamente.
          </p>
        ) : null}

        <LoginForm />

        <p className="auth-footer">
          Ainda não possui acesso? <Link href="/cadastro">Cadastre-se</Link>.
        </p>
      </section>
    </main>
  );
}
