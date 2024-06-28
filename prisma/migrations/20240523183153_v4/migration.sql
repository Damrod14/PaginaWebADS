/*
  Warnings:

  - A unique constraint covering the columns `[boleta]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_boleta_key` ON `User`(`boleta`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
