/*
  Warnings:

  - You are about to drop the column `userBoleta` on the `BookRequest` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `boleta` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_usuario]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userid` to the `BookRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BookRequest` DROP FOREIGN KEY `BookRequest_userBoleta_fkey`;

-- DropIndex
DROP INDEX `User_boleta_key` ON `User`;

-- AlterTable
ALTER TABLE `BookRequest` DROP COLUMN `userBoleta`,
    ADD COLUMN `userid` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `boleta`,
    ADD COLUMN `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_usuario`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_usuario_key` ON `User`(`id_usuario`);
