# Cursos Gestão — Projeto Full-Stack

Projeto acadêmico da disciplina de Desenvolvimento de Sistemas Web.

## Estrutura

```text
cursos-gestao/
├── prisma/
├── src/          # API Node.js + Express
└── frontend/     # Next.js 16
```

## Back-end

Stack:

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs
- Zod

A API deve rodar em uma porta diferente do Next.js. No ambiente usado durante os testes:

```env
PORT=3001
```

### Ajuste da Etapa 2

Foi adicionado:

```http
GET /api/auth/me
Authorization: Bearer <token>
```

Esse endpoint permite que o Next.js confirme no servidor se a sessão atual continua válida.

## Front-end

Stack:

- Next.js 16
- React 19
- App Router
- Server Components
- Server Actions

O navegador conversa somente com o Next.js. Toda chamada para a API acontece no servidor.

## Ordem para executar

### 1. PostgreSQL

Deixe o banco `cursos_gestao` disponível.

### 2. API

Na raiz:

```bash
npm install
npm run dev
```

### 3. Next.js

Crie:

```text
frontend/.env.local
```

com:

```env
CAPACITACAO_API_URL=http://localhost:3001/api
```

Depois:

```bash
cd frontend
npm install
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Fluxo principal

```text
Cadastro
  ↓
Login
  ↓
JWT em cookie HttpOnly
  ↓
Verificação GET /api/auth/me
  ↓
Dashboard protegido
  ↓
Cursos / Matrículas / Certificados
```

## Observação de segurança

Arquivos `.env` e `.env.local` não devem ser enviados ao Git. O front-end inclui apenas `.env.local.example`, sem segredo real.
