"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

type Post = {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    tags: string;
    createdAt: string;
};

type ClientProps = {
    posts: Post[];
    initialRecommendedPosts: Post[];
    totalPages: number;
    totalPosts: number;
}

export default function Client({ posts, initialRecommendedPosts, totalPages, totalPosts }: ClientProps) {
    const [recommendedPosts, setRecommendedPosts] = useState<Post[]>(initialRecommendedPosts);
    const [visiblePosts, setVisiblePosts] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPagesState, setTotalPagesState] = useState(totalPages);
    const [skip, setSkip] = useState<number>(5);

    // もっと読むボタンをクリックした時の処理
    const handleLoadMoreRecommended = async (event: React.MouseEvent) => {
        event.preventDefault(); // デフォルト動作を防止してスクロールを防ぐ

        // 現在のスクロール位置を取得
        const currentScrollY = window.scrollY;

        setLoading(true);
        try {
            const res = await fetch(`/api/recommended-posts?skip=${skip}&take=5`); // 5件ずつ取得
            const newPosts: Post[] = await res.json();
            setRecommendedPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setSkip(skip + 5); // 次回取得のためにskipを更新

            // スクロール位置を元に戻す
            window.scrollTo({ top: currentScrollY });
        } catch (error) {
            console.error('Failed to fetch more posts:', error);
        }
        setLoading(false);
    };

    const handleLoadMore = async () => {
        // 現在のスクロール位置を記録
        const scrollPosition = window.scrollY;

        // 新しい記事を読み込む
        const newVisiblePosts = visiblePosts + 5;  // 一度に5件追加で表示
        setVisiblePosts(newVisiblePosts);

        // 記事を追加した後、スクロール位置を復元
        window.scrollTo(0, scrollPosition);
    };

    return (
        <>
            {/* トレンド記事エリア */}
            <h2 className="text-lg font-bold mb-4 text-gray-500 dark:text-gray-400">トレンドの記事</h2>
            <div className="flex space-x-4 overflow-x-auto">
                {posts.map((post: Post) => (
                    <Link href={`/posts/${post.id}`} key={post.id} className="min-w-[300px] flex-shrink-0">
                        <Card className="mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="p-4 rounded-t-md">
                                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">{post.title}</CardTitle>
                                <CardDescription className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {post.tags.split(',').map((tag: string, index: number) => (
                                        <Badge key={index} variant="secondary"
                                               className="bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className={"text-gray-800 dark:text-gray-200"}>
                                <p>{post.excerpt}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* おすすめ記事エリア */}
            <h2 className="text-lg font-bold mb-4 pt-10 text-gray-500 dark:text-gray-400">おすすめの記事</h2>
            <div className="space-y-4">
                {recommendedPosts.map((post: Post) => (
                    <Link href={`/posts/${post.id}`} key={post.id}>
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
                            <CardContent className={"text-gray-800 dark:text-gray-200"}>
                                <p>{post.excerpt}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* もっと読むボタン */}
            {recommendedPosts.length < totalPosts && ( // totalPostsと比較して表示制御
                <div className="mt-6 flex justify-center">
                    <Button onClick={handleLoadMoreRecommended} disabled={loading} className={"text-white"}>
                        {loading ? '読み込み中...' : 'もっと読む'}
                    </Button>
                </div>
            )}
        </>
    );
}