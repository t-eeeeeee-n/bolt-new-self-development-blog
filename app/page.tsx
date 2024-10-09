import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import Pagination from '@/components/Pagination';

async function getPosts(page = 1) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const page = parseInt(searchParams.page || '1');
  const { posts, totalPages, currentPage } = await getPosts(page);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">自己啓発ブログ</h1>
        <div className="relative">
          <Input type="search" placeholder="記事を検索..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <main className="md:col-span-3">
          <section className="grid gap-6 md:grid-cols-2">
            {posts.map((post: any) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.excerpt}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild>
                    <Link href={`/posts/${post.id}`}>続きを読む</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </main>
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>カテゴリー</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {/* カテゴリーリストは動的に生成する必要があります */}
              </ul>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>タグ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {/* タグリストは動的に生成する必要があります */}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}