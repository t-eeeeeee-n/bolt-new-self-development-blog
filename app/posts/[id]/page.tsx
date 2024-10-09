import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <CardDescription>
            投稿日: {new Date(post.createdAt).toLocaleDateString()} | カテゴリー: {post.category}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.split(',').map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag.trim()}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{post.content}</p>
          <Separator className="my-8" />
          <h3 className="text-2xl font-semibold mb-4">コメント</h3>
          <CommentList comments={post.comments} />
          <CommentForm postId={post.id} />
        </CardContent>
      </Card>
    </div>
  );
}