"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Search } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Badge } from "@/components/ui/badge";
import { getPosts } from '@/lib/api';

type Post = {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    tags: string;
    createdAt: string;
};

type ClientProps = {
    initialPosts: Post[];
    initialQuery: string;
    initialPage: number;
    totalPages: number;
    totalPosts: number;
};

export default function Client({ initialPosts, initialQuery, initialPage, totalPages, totalPosts }: ClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(initialQuery);
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPagesState, setTotalPagesState] = useState(totalPages);
    const [totalPostsState, setTotalPostsState] = useState(totalPosts);

    // 前のクエリとページ番号を保持するuseRef
    const queryRef = useRef(initialQuery);
    const currentPageRef = useRef(initialPage);

    useEffect(() => {
        if (!searchParams) return; // searchParamsがnullの場合は何もしない

        const fetchData = async () => {
            const currentQuery = searchParams.get('q') || '';
            const currentPageParam = parseInt(searchParams.get('page') || '1', 10);

            // 前のクエリとページ番号を保持しているuseRef
            if (currentQuery !== queryRef.current || currentPageParam !== currentPageRef.current) {
                await fetchPosts(currentPageParam, currentQuery); // Promiseの結果を待つ
                setQuery(currentQuery); // 検索クエリを更新
                setCurrentPage(currentPageParam); // 現在のページを更新
                queryRef.current = currentQuery;
                currentPageRef.current = currentPageParam;
            }
        };

        fetchData().catch((error) => {
            console.error('Error fetching posts:', error);
        });
    }, [searchParams, currentPage]);

    const fetchPosts = async (page: number, searchQuery: string) => {
        setLoading(true);
        try {
            const data = await getPosts(page, searchQuery);
            setPosts(data.posts);
            setTotalPagesState(data.totalPages);
            setTotalPostsState(data.totalPosts);
            setCurrentPage(page);
            setQuery(searchQuery);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`/search?q=${encodeURIComponent(query)}&page=${page}`);
    };

    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-4">
            <div className="col-span-3 hidden lg:block">
                <div className="h-full w-full flex items-center justify-center">
                    {/*<p>広告スペース</p>*/}
                </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
                <h1 className="text-3xl font-bold mb-6">記事一覧</h1>

                {/* 検索フォーム */}
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

                {/* 検索結果の件数表示 */}
                <p className="mb-4 text-gray-600">
                    検索結果：{totalPostsState} 件
                </p>

                {/* 検索結果の表示 */}
                {loading ? (
                    <p>読み込み中...</p>
                ) : posts.length > 0 ? (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/posts/${post.id}`} className="block">
                                <Card className="mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader className="p-4 rounded-t-md">
                                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">{post.title}</CardTitle>
                                        <CardDescription className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {post.tags.split(',').map((tag: string, index: number) => (
                                                <Badge key={index} variant="secondary"
                                                       className="bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                                                    {tag.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="text-gray-800 dark:text-gray-200">
                                        <p>{post.excerpt}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>検索結果がありません。</p>
                )}

                {/* ページネーション */}
                {totalPagesState > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPagesState} onPageChange={handlePageChange} />
                )}
            </div>

            <div className="col-span-3 hidden lg:block">
                <div className="h-full w-full flex items-center justify-center">
                    {/*<p>広告スペース</p>*/}
                </div>
            </div>
        </div>
    );
}
