import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0', 10);  // スキップする件数
    const take = parseInt(searchParams.get('take') || '5', 10);  // 取得する件数

    const recommendedPosts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: take,
    });

    return NextResponse.json(recommendedPosts);
}
