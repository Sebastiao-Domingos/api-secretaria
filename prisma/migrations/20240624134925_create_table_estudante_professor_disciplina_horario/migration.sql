/*
  Warnings:

  - Added the required column `telemovel` to the `Administrador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_id_administrador_fkey";

-- AlterTable
ALTER TABLE "Administrador" ADD COLUMN     "telemovel" VARCHAR(9) NOT NULL;

-- AlterTable
ALTER TABLE "Endereco" ADD COLUMN     "id_estudante" UUID,
ADD COLUMN     "id_professor" UUID,
ALTER COLUMN "id_administrador" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Curso" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" VARCHAR(12) NOT NULL,
    "duracao" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" VARCHAR(12) NOT NULL,
    "id_curso" UUID NOT NULL,
    "id_professor" UUID,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matricula" (
    "id" UUID NOT NULL,
    "status" "Status" NOT NULL,
    "data_matricula" TIMESTAMP(3) NOT NULL,
    "id_disciplina" UUID NOT NULL,
    "id_estudante" UUID NOT NULL,

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" UUID NOT NULL,
    "hora_inicio" TEXT NOT NULL,
    "hora_final" TEXT NOT NULL,
    "dia_semana" INTEGER NOT NULL,
    "sala" INTEGER NOT NULL,
    "id_disciplina" UUID NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "numero_bi" VARCHAR(255) NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudante" (
    "id" UUID NOT NULL,
    "num_processo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "numero_bi" VARCHAR(255) NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "ano_ingresso" INTEGER NOT NULL,
    "id_curso" UUID NOT NULL,

    CONSTRAINT "Estudante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" UUID NOT NULL,
    "nota_parcelar1" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nota_parcelar2" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nota_exame" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "situacao" TEXT NOT NULL,
    "id_disciplina" UUID NOT NULL,
    "id_estudante" UUID NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_nome_key" ON "Curso"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_codigo_key" ON "Curso"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nome_key" ON "Disciplina"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_codigo_key" ON "Disciplina"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_nome_key" ON "Professor"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_telefone_key" ON "Professor"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_numero_bi_key" ON "Professor"("numero_bi");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_nome_key" ON "Estudante"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_email_key" ON "Estudante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_telefone_key" ON "Estudante"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_numero_bi_key" ON "Estudante"("numero_bi");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_id_administrador_fkey" FOREIGN KEY ("id_administrador") REFERENCES "Administrador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_id_estudante_fkey" FOREIGN KEY ("id_estudante") REFERENCES "Estudante"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_id_estudante_fkey" FOREIGN KEY ("id_estudante") REFERENCES "Estudante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudante" ADD CONSTRAINT "Estudante_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_id_estudante_fkey" FOREIGN KEY ("id_estudante") REFERENCES "Estudante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
