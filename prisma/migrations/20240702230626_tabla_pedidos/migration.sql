/*
  Warnings:

  - Added the required column `bookId` to the `BookRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BookRequest` ADD COLUMN `bookId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BookRequest` ADD CONSTRAINT `BookRequest_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Libro`(`id_libro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookRequest` ADD CONSTRAINT `BookRequest_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
