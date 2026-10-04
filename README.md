# Gestão de Cursos Corporativos

API REST desenvolvida para a **Etapa 1 do Projeto de Avaliação Full-Stack** da disciplina de **Desenvolvimento de Sistemas Web**.

O projeto representa um sistema corporativo de capacitação, permitindo o cadastro e autenticação de colaboradores, gerenciamento de cursos, realização de matrículas e consulta de certificados.

## Objetivo

Desenvolver um back-end estruturado em camadas utilizando **Node.js**, **Express**, **Prisma ORM** e **PostgreSQL**, aplicando autenticação, validação de dados, persistência relacional e tratamento centralizado de erros.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JSON Web Token (JWT)
- bcryptjs
- Zod
- dotenv
- CORS
- Nodemon

## Arquitetura

O projeto segue a separação:

```text
routes
  ↓
controllers
  ↓
services
  ↓
Prisma ORM
  ↓
PostgreSQL
```

- **routes/**: define endpoints e middlewares.
- **controllers/**: recebe requisições e formata respostas HTTP.
- **services/**: contém regras de negócio e acesso ao Prisma.
- **schemas/**: valida os dados com Zod.
- **middlewares/**: autenticação, validação e tratamento de erros.

## Entidades

### Colaborador

Representa o funcionário e também o usuário autenticado do sistema.

Campos principais:

- `id_colaborador`
- `nome`
- `cpf`
- `email`
- `senha`
- `data_admissao`
- `cargo_atual`
- `setor`

### Curso

Representa os treinamentos disponíveis.

Campos principais:

- `id_curso`
- `titulo`
- `conteudo_programatico`
- `area_conhecimento`
- `carga_horaria`
- `descricao`

### Matrícula

Relaciona colaboradores e cursos.

Campos principais:

- `id_matricula`
- `data_matricula`
- `data_conclusao`
- `situacao`
- `progresso`
- `id_colaborador`
- `id_curso`
- `id_certificado`

### Certificado

Representa o certificado associado a uma matrícula concluída.

Campos principais:

- `id_certificado`
- `codigo_autenticacao`
- `data_emissao`
- `data_validade`
- `url_documento`

## Relacionamentos

```text
Colaborador 1 ─── N Matrícula N ─── 1 Curso
                       │
                       │ 0..1
                       ▼
                  Certificado
```

## Estrutura de pastas

```text
cursos-gestao/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── certificadoController.js
│   │   ├── cursoController.js
│   │   └── matriculaController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── certificadoRoutes.js
│   │   ├── cursoRoutes.js
│   │   ├── matriculaRoutes.js
│   │   └── index.js
│   ├── schemas/
│   │   ├── authSchemas.js
│   │   ├── cursoSchemas.js
│   │   └── matriculaSchemas.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── certificadoService.js
│   │   ├── cursoService.js
│   │   └── matriculaService.js
│   ├── utils/
│   │   └── AppError.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Pré-requisitos

- Node.js 20 ou superior
- npm
- PostgreSQL
- Git

## Instalação

Clone o repositório:

```bash
git clone https://github.com/LuskaGarcia/cursos-gestao.git
cd cursos-gestao
```

Instale as dependências:

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes informações de exemplo.

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/capacitacao?schema=public"
JWT_SECRET="sua-chave-secreta"
```

> O arquivo `.env` não deve ser enviado ao GitHub.

## Banco de dados

Gere o Prisma Client:

```bash
npm run prisma:generate
```

Execute a migration:

```bash
npm run prisma:migrate -- --name init
```

Opcionalmente, abra o Prisma Studio:

```bash
npm run prisma:studio
```

## Executando o projeto

Desenvolvimento:

```bash
npm run dev
```

Execução normal:

```bash
npm start
```

Por padrão:

```text
http://localhost:3000
```

Health check:

```http
GET /api/health
```

## Autenticação

As rotas protegidas utilizam JWT.

Após o login, envie o token no cabeçalho:

```http
Authorization: Bearer SEU_TOKEN
```

## Endpoints

### Autenticação

| Método | Endpoint | Protegida | Descrição |
|---|---|---:|---|
| POST | `/api/auth/register` | Não | Cadastra um colaborador |
| POST | `/api/auth/login` | Não | Realiza login e retorna JWT |

### Cursos

| Método | Endpoint | Protegida | Descrição |
|---|---|---:|---|
| GET | `/api/cursos` | Não | Lista todos os cursos |
| GET | `/api/cursos/:id` | Não | Busca um curso por ID |
| POST | `/api/cursos` | Sim | Cria um curso |
| PUT | `/api/cursos/:id` | Sim | Atualiza um curso |
| DELETE | `/api/cursos/:id` | Sim | Remove um curso |

### Matrículas

| Método | Endpoint | Protegida | Descrição |
|---|---|---:|---|
| POST | `/api/matriculas` | Sim | Matricula o colaborador autenticado |
| GET | `/api/matriculas/minhas` | Sim | Lista as matrículas do colaborador autenticado |

### Certificados

| Método | Endpoint | Protegida | Descrição |
|---|---|---:|---|
| GET | `/api/certificados` | Sim | Lista certificados emitidos |
| GET | `/api/certificados/:identificador` | Sim | Busca certificado por ID ou código |

## Exemplos

### Cadastro

```json
{
  "nome": "Fulano de Tal",
  "cpf": "123.456.789-00",
  "email": "fulano@empresa.com",
  "senha": "Senha1234",
  "data_admissao": "2026-09-01",
  "cargo_atual": "Analista",
  "setor": "Tecnologia"
}
```

### Login

```json
{
  "email": "teste@empresa.com",
  "senha": "Senha1234"
}
```

### Criar curso

```json
{
  "titulo": "Node.js e APIs REST",
  "conteudo_programatico": "Node.js, Express, Prisma e autenticação JWT.",
  "area_conhecimento": "Desenvolvimento Web",
  "carga_horaria": 20,
  "descricao": "Curso de desenvolvimento de APIs REST utilizando Node.js."
}
```

### Realizar matrícula

```json
{
  "id_curso": 1
}
```

A matrícula é criada inicialmente com situação `EM_ANDAMENTO`, progresso `0`, sem data de conclusão e sem certificado associado.

## Segurança e validação

O projeto utiliza:

- hash de senha com `bcryptjs`;
- autenticação com JWT;
- rotas protegidas por middleware;
- validação com Zod;
- variáveis sensíveis no `.env`;
- CORS;
- tratamento centralizado de erros;
- e-mail e CPF únicos;
- senha não retornada nas respostas da API.

## Códigos HTTP principais

| Código | Uso |
|---:|---|
| `200` | Requisição realizada com sucesso |
| `201` | Recurso criado |
| `204` | Recurso removido |
| `400` | Dados inválidos |
| `401` | Token ausente ou inválido |
| `404` | Recurso não encontrado |
| `409` | Conflito de dados ou relacionamento |
| `500` | Erro interno do servidor |

## Scripts

```bash
npm run dev
npm start
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:studio
```

## Fluxo sugerido para demonstração

1. Cadastrar um colaborador.
2. Fazer login.
3. Copiar o JWT retornado.
4. Criar um curso usando o token.
5. Listar cursos.
6. Buscar curso por ID.
7. Atualizar um curso.
8. Realizar matrícula.
9. Consultar as próprias matrículas.
10. Consultar certificados.
11. Demonstrar uma rota protegida sem token.

## Etapa do projeto

Esta versão corresponde à **Etapa 1 — Back-end**.

A próxima etapa prevê a construção do front-end em **Next.js**, consumindo esta API e implementando autenticação e gerenciamento das informações pela interface.

## Integrantes

- Gustavo Crispim
- Daniel Orige
- Lucas Garcia

## Disciplina

**Desenvolvimento de Sistemas Web**

Projeto acadêmico desenvolvido como avaliação full-stack da disciplina.