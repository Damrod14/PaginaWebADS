/*
  Warnings:

  - Added the required column `contrasena` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `contrasena` VARCHAR(191) NOT NULL;
