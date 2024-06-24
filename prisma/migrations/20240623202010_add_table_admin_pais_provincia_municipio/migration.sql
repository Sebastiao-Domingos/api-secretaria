/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ativo', 'desativo');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Pais" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "id_pais" UUID NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipio" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "id_provincia" UUID NOT NULL,
    "id_administrador" UUID NOT NULL,

    CONSTRAINT "Municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "numero_bi" VARCHAR(255) NOT NULL,
    "palavra_passe" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" UUID NOT NULL,
    "distrito" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "id_municipio" UUID NOT NULL,
    "id_administrador" UUID NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pais_nome_key" ON "Pais"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Provincia_nome_key" ON "Provincia"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");

-- AddForeignKey
ALTER TABLE "Provincia" ADD CONSTRAINT "Provincia_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipio" ADD CONSTRAINT "Municipio_id_provincia_fkey" FOREIGN KEY ("id_provincia") REFERENCES "Provincia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_id_municipio_fkey" FOREIGN KEY ("id_municipio") REFERENCES "Municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_id_administrador_fkey" FOREIGN KEY ("id_administrador") REFERENCES "Administrador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
