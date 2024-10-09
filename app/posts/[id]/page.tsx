import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import { getSession } from "next-auth/react";
import Link from 'next/link';

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

  // サーバーサイドでセッションを取得
  const session = await getSession();

  return (
      <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-4">
        {/* 左側の広告領域 */}
        <div className="col-span-3 hidden lg:block">
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <p>広告スペース</p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="col-span-12 lg:col-span-6">
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

              {/* ログインしている場合のみコメントフォームを表示 */}
              {session ? (
                  <CommentForm postId={post.id} />
              ) : (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      コメントを投稿するには <Link href="/auth/signin" className="text-blue-500 underline">ログイン</Link> してください。
                    </p>
                  </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 右側の広告領域 */}
        <div className="col-span-3 hidden lg:block">
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <p>広告スペース</p>
          </div>
        </div>
      </div>
  );
}
