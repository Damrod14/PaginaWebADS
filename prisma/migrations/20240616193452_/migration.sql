/*
  Warnings:

  - You are about to drop the column `portada` on the `Libro` table. All the data in the column will be lost.
  - Added the required column `imagen` to the `Libro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreArchivo` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Libro` DROP COLUMN `portada`,
    ADD COLUMN `imagen` LONGBLOB NOT NULL,
    ADD COLUMN `nombreArchivo` TEXT NOT NULL;
