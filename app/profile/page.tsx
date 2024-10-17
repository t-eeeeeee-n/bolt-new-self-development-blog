"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Mail } from 'lucide-react';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // ユーザーがログインしていない場合、ログインページにリダイレクト
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <Card className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white dark:bg-gray-800">
                <CardHeader className="text-center mb-6">
                    <User className="mx-auto text-gray-400 dark:text-gray-300" size={48}/>
                    <CardTitle
                        className="text-2xl font-bold text-gray-800 dark:text-white mt-4">プロフィール情報</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex items-center justify-center space-x-4">
                            <User className="text-blue-500" size={24}/>
                            <div>
                                <p className="text-gray-600 dark:text-gray-300">ユーザー名:</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-white">{session.user?.name || "N/A"}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <Mail className="text-green-500" size={24}/>
                            <div>
                                <p className="text-gray-600 dark:text-gray-300">メールアドレス:</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-white">{session.user?.email}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
