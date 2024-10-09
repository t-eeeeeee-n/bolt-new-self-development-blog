import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    include: {
      author: {
        select: { name: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const total = await prisma.post.count()

  return NextResponse.json({
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { title, content, excerpt, category, tags, authorId } = body

  const post = await prisma.post.create({
    data: {
      title,
      content,
      excerpt,
      category,
      tags,
      authorId: parseInt(authorId)
    }
  })

  return NextResponse.json(post)
}