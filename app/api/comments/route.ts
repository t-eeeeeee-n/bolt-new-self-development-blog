import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const { content, authorId, postId } = body

  const comment = await prisma.comment.create({
    data: {
      content,
      authorId: parseInt(authorId),
      postId: parseInt(postId)
    }
  })

  return NextResponse.json(comment)
}