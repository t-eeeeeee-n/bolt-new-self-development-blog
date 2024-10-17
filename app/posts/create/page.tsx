"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from 'lucide-react';  // アイコンを使ってデザインを改善
import { useRouter } from 'next/navigation'; // useRouterをインポート

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState<string[]>(['']); // タグの入力欄を増やす
    const router = useRouter(); // useRouterを初期化

    // タグの入力欄を追加
    const handleAddTagField = () => {
        setTags([...tags, '']); // 新しい空のタグ入力欄を追加
    };

    // タグの入力値を更新
    const handleTagChange = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    // タグを削除
    const handleRemoveTagField = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    // フォームの送信処理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // フォームの内容をオブジェクトにまとめる
        const postData = {
            title,
            excerpt,
            content,
            category,
            tags: tags.join(','), // タグを配列として送信
            authorId: 1 // 固定で1を使用していますが、実際にはログインユーザーのIDなどを設定するべきです
        };

        try {
            // APIエンドポイントにPOSTリクエストを送信
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            // レスポンスの確認
            if (!res.ok) {
                throw new Error('記事の投稿に失敗しました');
            }

            const data = await res.json();
            console.log('記事が投稿されました:', data);

            // 投稿成功後、リダイレクト処理
            router.push('/search'); // 投稿後に検索ページなどにリダイレクト
        } catch (error) {
            console.error('記事の投稿エラー:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-4">
            {/* 左側の広告スペース */}
            <div className="col-span-3 hidden lg:block">
                <div className="h-full w-full flex items-center justify-center">
                    {/*<p>広告スペース</p>*/}
                </div>
            </div>

            {/* 記事作成フォーム */}
            <div className="col-span-12 lg:col-span-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">記事の作成</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block font-semibold">タイトル</label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor="excerpt" className="block font-semibold">要約 (最大100文字)</label>
                                <Input
                                    id="excerpt"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    maxLength={100}
                                    required
                                />
                                <div className="text-right text-sm text-gray-500">
                                    {excerpt.length}/100 文字
                                </div>
                            </div>

                            <div>
                                <label htmlFor="content" className="block font-semibold">内容</label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    className="w-full h-40 p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block font-semibold">カテゴリー</label>
                                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                            </div>

                            {/* タグ入力部分 */}
                            <div>
                                <label htmlFor="tags" className="block font-semibold">タグ</label>
                                <div className="space-y-2">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Input
                                                value={tag}
                                                onChange={(e) => handleTagChange(index, e.target.value)}
                                                placeholder="タグを入力..."
                                                className="flex-grow"
                                            />
                                            {tags.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="p-1 text-gray-500 hover:text-red-500"
                                                    onClick={() => handleRemoveTagField(index)}
                                                >
                                                    <X size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="mt-2 flex items-center text-blue-500 hover:text-blue-600"
                                    onClick={handleAddTagField}
                                >
                                    <Plus className="mr-1" size={18} />
                                    タグを追加
                                </Button>
                            </div>

                            <Button type="submit" className="w-full mt-4 text-white" variant="default">
                                投稿する
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* 右側の広告スペース */}
            <div className="col-span-3 hidden lg:block">
                <div className="h-full w-full flex items-center justify-center">
                    {/*<p>広告スペース</p>*/}
                </div>
            </div>
        </div>
    );
}
