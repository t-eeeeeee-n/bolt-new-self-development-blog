import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    const body = await request.json();
    const { title, content, excerpt, category, tags, authorId } = body;

    // 投稿データを作成
    const post = await prisma.post.create({
        data: {
            title,
            content,
            excerpt,
            category,
            tags,
            authorId: parseInt(authorId), // 数字に変換
        },
    });

    return NextResponse.json(post);
}
