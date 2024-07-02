/*
  Warnings:

  - You are about to drop the column `bookId` on the `BookRequest` table. All the data in the column will be lost.
  - You are about to drop the column `cantidadPrestados` on the `Libro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_libro]` on the table `Libro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `editorial` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BookRequest` DROP FOREIGN KEY `BookRequest_bookId_fkey`;

-- AlterTable
ALTER TABLE `BookRequest` DROP COLUMN `bookId`;

-- AlterTable
ALTER TABLE `Libro` DROP COLUMN `cantidadPrestados`,
    ADD COLUMN `cantidadVendidos` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `edicion` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `editorial` TEXT NOT NULL,
    MODIFY `id_libro` INTEGER NOT NULL,
    MODIFY `cantidad` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Libro_id_libro_key` ON `Libro`(`id_libro`);
