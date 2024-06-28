import { PrismaClient } from "@prisma/client";
const prismaAdmin = new PrismaClient();

export default prismaAdmin.bookRequest;