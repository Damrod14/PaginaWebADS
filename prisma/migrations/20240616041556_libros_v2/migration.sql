/*
  Warnings:

  - Added the required column `cantidadPrestados` to the `Libro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Libro` ADD COLUMN `cantidadPrestados` INTEGER NOT NULL,
    ADD COLUMN `descripcion` VARCHAR(191) NOT NULL;
