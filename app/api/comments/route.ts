// app/api/comments/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // next-auth の設定が定義されたファイルを参照

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // ユーザーがログインしていない場合はエラーを返す
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { content, postId } = body;

  // コメント作成
  const comment = await prisma.comment.create({
    data: {
      content,
      authorId: parseInt(session.user.id, 10),
      postId: parseInt(postId, 10),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return NextResponse.json(comment);
}

// GET メソッドの追加
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { postId: parseInt(postId, 10) },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return NextResponse.json(comments);
}
