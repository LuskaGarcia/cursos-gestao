-- CreateTable
CREATE TABLE "colaboradores" (
    "id_colaborador" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "data_admissao" DATE NOT NULL,
    "cargo_atual" VARCHAR(20) NOT NULL,
    "setor" VARCHAR(20) NOT NULL,

    CONSTRAINT "colaboradores_pkey" PRIMARY KEY ("id_colaborador")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id_curso" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "conteudo_programatico" VARCHAR(500) NOT NULL,
    "area_conhecimento" VARCHAR(50) NOT NULL,
    "carga_horaria" INTEGER NOT NULL,
    "descricao" VARCHAR(500) NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "certificados" (
    "id_certificado" SERIAL NOT NULL,
    "codigo_autenticacao" VARCHAR(50) NOT NULL,
    "data_emissao" DATE NOT NULL,
    "data_validade" DATE NOT NULL,
    "url_documento" VARCHAR(255) NOT NULL,

    CONSTRAINT "certificados_pkey" PRIMARY KEY ("id_certificado")
);

-- CreateTable
CREATE TABLE "matriculas" (
    "id_matricula" SERIAL NOT NULL,
    "data_matricula" DATE NOT NULL,
    "data_conclusao" DATE,
    "situacao" VARCHAR(20) NOT NULL,
    "progresso" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "id_colaborador" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "id_certificado" INTEGER,

    CONSTRAINT "matriculas_pkey" PRIMARY KEY ("id_matricula")
);

-- CreateIndex
CREATE UNIQUE INDEX "colaboradores_cpf_key" ON "colaboradores"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "colaboradores_email_key" ON "colaboradores"("email");

-- CreateIndex
CREATE INDEX "colaboradores_nome_idx" ON "colaboradores"("nome");

-- CreateIndex
CREATE INDEX "cursos_titulo_idx" ON "cursos"("titulo");

-- CreateIndex
CREATE INDEX "cursos_area_conhecimento_idx" ON "cursos"("area_conhecimento");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_codigo_autenticacao_key" ON "certificados"("codigo_autenticacao");

-- CreateIndex
CREATE INDEX "certificados_data_emissao_idx" ON "certificados"("data_emissao");

-- CreateIndex
CREATE UNIQUE INDEX "matriculas_id_certificado_key" ON "matriculas"("id_certificado");

-- CreateIndex
CREATE INDEX "matriculas_id_colaborador_idx" ON "matriculas"("id_colaborador");

-- CreateIndex
CREATE INDEX "matriculas_id_curso_idx" ON "matriculas"("id_curso");

-- CreateIndex
CREATE INDEX "matriculas_situacao_idx" ON "matriculas"("situacao");

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_id_colaborador_fkey" FOREIGN KEY ("id_colaborador") REFERENCES "colaboradores"("id_colaborador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "cursos"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_id_certificado_fkey" FOREIGN KEY ("id_certificado") REFERENCES "certificados"("id_certificado") ON DELETE SET NULL ON UPDATE CASCADE;
