# Cursos Gestão — Front-end Next.js

Front-end da Etapa 2 do projeto full-stack de Desenvolvimento de Sistemas Web.

## Arquitetura

O navegador conhece somente o servidor Next.js. O Next.js acessa a API Node.js no servidor:

```text
Navegador
   ↓
Next.js (porta 3000)
   ↓
API Node.js / Express (porta 3001)
   ↓
Prisma
   ↓
PostgreSQL
```

O navegador não chama `localhost:3001` diretamente.

## Requisitos

- Node.js 20.9+
- Back-end da Etapa 1 funcionando
- PostgreSQL configurado
- API em `http://localhost:3001`

## Instalação

```bash
cd frontend
npm install
```

## Variáveis de ambiente

Copie `.env.local.example` para `.env.local`:

```env
CAPACITACAO_API_URL=http://localhost:3001/api
```

A variável não utiliza `NEXT_PUBLIC_`, portanto não é exposta ao navegador.

O JWT também não fica em `localStorage`: após o login, o Next.js guarda o token em um cookie `HttpOnly`.

## Executar

Primeiro, suba o back-end:

```bash
npm run dev
```

Em outro terminal:

```bash
cd frontend
npm run dev
```

Abra:

```text
http://localhost:3000
```

## Funcionalidades

- cadastro de colaborador;
- login com JWT;
- verificação da sessão pelo endpoint `GET /api/auth/me`;
- logout;
- rota `/dashboard` protegida;
- catálogo público carregado no servidor;
- cache/revalidação de cursos em 60 segundos;
- dashboard com chamadas paralelas usando `Promise.all`;
- CRUD de cursos via Server Actions;
- matrícula do colaborador autenticado;
- consulta de matrículas e certificados;
- tratamento de falha da API com `error.js` e botão de nova tentativa;
- páginas 404 com `not-found.js`.

## Segurança da integração

`lib/api.js` importa `server-only`, impedindo seu uso acidental em Client Components.

O token JWT é lido somente no servidor a partir de cookie `HttpOnly` e enviado pelo Next.js para o back-end no cabeçalho:

```http
Authorization: Bearer <token>
```

## Teste de login

1. Acesse `/cadastro` e crie um colaborador.
2. O sistema realiza login automaticamente.
3. O JWT é salvo em cookie `HttpOnly`.
4. O layout de `/dashboard` chama `verifySession()`.
5. `verifySession()` consulta `GET /api/auth/me`.
6. Token ausente ou inválido redireciona para `/login`.
