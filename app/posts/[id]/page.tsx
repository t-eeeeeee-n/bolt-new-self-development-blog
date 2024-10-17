import {notFound} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {getServerSession} from "next-auth";
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import Client from "@/app/posts/[id]/client";
import React from "react";

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return await res.json();
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  // サーバーサイドでセッションを取得
  const session = await getServerSession(authOptions);

  return (
      <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-4">
        <div className="col-span-3 hidden lg:block">
          <div className="h-full w-full flex items-center justify-center">
            {/*<p>広告スペース</p>*/}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{post.title}</CardTitle>
              <CardDescription>
                <div>
                  <span>投稿日: {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span>カテゴリー: {post.category}</span>
                </div>
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.split(',').map((tag: string) => (
                    <Badge key={tag} variant="secondary"
                           className="bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                      {tag.trim()}
                    </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{post.content}</p>
              <Separator className="my-8" />
              {/* コメントセクションをクライアントコンポーネントとして分離 */}
              <Client postId={post.id} initialComments={post.comments} session={session} />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 hidden lg:block">
          <div className="h-full w-full flex items-center justify-center">
            {/*<p>広告スペース</p>*/}
          </div>
        </div>
      </div>
  );
}
