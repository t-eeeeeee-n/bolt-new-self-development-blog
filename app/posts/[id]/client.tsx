"use client";

import { useSession } from 'next-auth/react';
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import { CommentsProvider, useComments } from "@/components/CommentsContext";

type Props = {
    postId: number;
    initialComments: any[]; // 型を適宜設定してください
    session: any; // 型を適宜設定してください
};

export default function Client({ postId, initialComments, session }: Props) {
    return (
        <CommentsProvider postId={postId} initialComments={initialComments}>
            <CommentsSection postId={postId} session={session} />
        </CommentsProvider>
    );
}

function CommentsSection({ postId, session }: { postId: number; session: any }) {
    const { comments, loading } = useComments();

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">コメント</h3>
            {loading ? (
                <p>コメントを読み込み中...</p>
            ) : (
                <CommentList comments={comments} />
            )}
            {session ? (
                <CommentForm postId={postId} />
            ) : (
                <div className="mt-4">
                    <p className="text-sm text-gray-500">
                        コメントを投稿するには <a href="/auth/signin" className="text-blue-500 underline">ログイン</a> してください。
                    </p>
                </div>
            )}
        </div>
    );
}