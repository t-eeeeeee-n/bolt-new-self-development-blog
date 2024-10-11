import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit
    const search = searchParams.get('search') || '' // 検索クエリ

    // 検索クエリに基づいてフィルタリング
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      where: {
        title: {
          contains: search,
          // SQLiteではmodeがサポートされていないため削除する
        }
      },
      include: {
        author: {
          select: { name: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const total = await prisma.post.count({
      where: {
        title: {
          contains: search,
          // SQLiteではmodeがサポートされていないため削除する
        }
      }
    })

    return NextResponse.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    })

  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, excerpt, category, tags, authorId } = body

    // 必須項目のチェック
    if (!title || !content || !excerpt || !category || !tags || !authorId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

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

  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
}
