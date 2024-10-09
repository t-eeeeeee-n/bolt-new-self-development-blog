import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true }
      },
      comments: {
        include: {
          author: {
            select: { name: true }
          }
        }
      }
    }
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const { title, content, excerpt, category, tags } = body

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      excerpt,
      category,
      tags
    }
  })

  return NextResponse.json(updatedPost)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.post.delete({ where: { id } })
  return NextResponse.json({ message: 'Post deleted successfully' })
}