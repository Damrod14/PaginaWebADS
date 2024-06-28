/*
  Warnings:

  - You are about to drop the column `imagen` on the `Libro` table. All the data in the column will be lost.
  - You are about to drop the column `nombreArchivo` on the `Libro` table. All the data in the column will be lost.
  - Added the required column `portada` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Libro` DROP COLUMN `imagen`,
    DROP COLUMN `nombreArchivo`,
    ADD COLUMN `portada` TEXT NOT NULL;
