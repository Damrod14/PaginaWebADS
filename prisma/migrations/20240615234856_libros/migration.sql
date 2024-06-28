-- CreateTable
CREATE TABLE `Libro` (
    `id_libro` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `portada` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id_libro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
