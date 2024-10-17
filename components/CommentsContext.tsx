// components/CommentsContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Comment = {
    id: number;
    content: string;
    author: {
        name: string;
    };
    createdAt: string;
};

type CommentsContextType = {
    comments: Comment[];
    loading: boolean;
    fetchComments: () => Promise<void>;
};

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export const useComments = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error("useComments must be used within a CommentsProvider");
    }
    return context;
};

export function CommentsProvider({ postId, initialComments, children }: { postId: number; initialComments: Comment[]; children: ReactNode }) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        const res = await fetch(`/api/comments?postId=${postId}`);
        if (res.ok) {
            const data = await res.json();
            setComments(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <CommentsContext.Provider value={{ comments, loading, fetchComments }}>
            {children}
        </CommentsContext.Provider>
    );
}
