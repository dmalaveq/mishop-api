/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Ejemplo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ejemplo" ALTER COLUMN "description" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Ejemplo_description_key" ON "Ejemplo"("description");
