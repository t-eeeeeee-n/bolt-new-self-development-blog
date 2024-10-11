"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // CardFooter削除
import Link from 'next/link';
import { getPosts } from '@/lib/api'; // 非同期関数を適切にインポート
import { Search } from 'lucide-react';
import Pagination from '@/components/Pagination';
import {Badge} from "@/components/ui/badge"; // ページネーションをインポート

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams?.get('q') || '';
    const initialPage = parseInt(searchParams?.get('page') || '1'); // ページ番号の取得
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(initialPage); // 現在のページ
    const [totalPages, setTotalPages] = useState(1); // 総ページ数

    // 検索クエリとページ番号が変わるたびに検索結果を取得
    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await getPosts(currentPage, query); // 現在のページとクエリで検索
                setResults(data.posts);
                setTotalPages(data.totalPages); // 総ページ数をセット
            } catch (error) {
                console.error('検索結果の取得に失敗しました:', error);
            }
            setLoading(false);
        };

        // 非同期関数の呼び出しを適切に処理
        fetchResults().catch(console.error);
    }, [query, currentPage]);

    // 検索フォームの送信
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1); // 新しい検索時に1ページ目にリセット
        router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
    };

    // ページ変更時の処理
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`/search?q=${encodeURIComponent(query)}&page=${page}`);
    };

    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-4">
            <div className="col-span-3 hidden lg:block">
                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                    <p>広告スペース</p>
                </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
                <h1 className="text-3xl font-bold mb-6">記事検索</h1>
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-2">
                        <Input
                            type="search"
                            placeholder="キーワードを入力..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-grow"
                        />
                        <Button type="submit">
                            <Search className="mr-2 h-4 w-4" /> 検索
                        </Button>
                    </div>
                </form>
                {loading ? (
                    <p>読み込み中...</p>
                ) : results.length > 0 ? (
                    <div className="space-y-4">
                        {results.map((post) => (
                            <Link key={post.id} href={`/posts/${post.id}`} className="block">
                                <Card className="mb-4 cursor-pointer">
                                    <CardHeader>
                                        <CardTitle>{post.title}</CardTitle>
                                        <CardDescription>{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {post.tags.split(',').map((tag: string, index: number) => (
                                                <Badge key={index} variant="secondary">
                                                    {tag.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{post.excerpt}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>検索結果がありません。</p>
                )}

                {/* ページネーションの追加 */}
                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                )}
            </div>

            <div className="col-span-3 hidden lg:block">
                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                    <p>広告スペース</p>
                </div>
            </div>
        </div>
    );
}
