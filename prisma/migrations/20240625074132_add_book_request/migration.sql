-- CreateTable
CREATE TABLE `BookRequest` (
    `id_request` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `userBoleta` INTEGER NOT NULL,

    PRIMARY KEY (`id_request`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookRequest` ADD CONSTRAINT `BookRequest_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Libro`(`id_libro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookRequest` ADD CONSTRAINT `BookRequest_userBoleta_fkey` FOREIGN KEY (`userBoleta`) REFERENCES `User`(`boleta`) ON DELETE RESTRICT ON UPDATE CASCADE;
