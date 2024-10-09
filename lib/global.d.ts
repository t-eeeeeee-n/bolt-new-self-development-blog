import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

// ファイルがモジュールとして扱われるようにするための空のexport文
export {};