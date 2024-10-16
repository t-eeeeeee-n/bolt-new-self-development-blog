import React from 'react';
import { getPosts, getRecommendedPosts } from '@/lib/api';
import Client from "@/app/client"; // データ取得関数を別ファイルにまとめて読み込み

export default async function Home({ searchParams }: { searchParams: { page: string, q?: string } }) {
    const page = parseInt(searchParams.page || '1');
    const searchQuery = searchParams.q || '';  // 検索クエリが存在しない場合は空文字列

    // トレンド記事の取得 (検索クエリがある場合、それを使用して記事を取得)
    const { posts, totalPages, currentPage } = await getPosts(page, searchQuery);

    // おすすめ記事の取得
    const recommendedPosts = await getRecommendedPosts();

    // クライアントコンポーネントにデータを渡す
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
                <Client posts={posts} initialRecommendedPosts={recommendedPosts.slice(0, 5)} />
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