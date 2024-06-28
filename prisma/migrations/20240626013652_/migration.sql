/*
  Warnings:

  - Added the required column `aceptado` to the `BookRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaEntrega` to the `BookRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaRecoger` to the `BookRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BookRequest` ADD COLUMN `aceptado` BOOLEAN NOT NULL,
    ADD COLUMN `fechaEntrega` DATE NOT NULL,
    ADD COLUMN `fechaRecoger` DATE NOT NULL;
