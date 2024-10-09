"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.ok) {
            router.push("/"); // ログイン後のリダイレクト先
        } else {
            console.error("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">ログイン</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="メールアドレス"
                            className="w-full"
                            required
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="パスワード"
                            className="w-full"
                            required
                        />
                        <Button type="submit" className="w-full">
                            ログイン
                        </Button>
                    </form>
                    <Separator className="my-6"/>
                    <Button
                        onClick={() => signIn("google")}
                        className={`flex justify-center items-center w-full bg-red-600 text-white`}
                    >
                        <Image className="mr-2" alt="icon" src="/google-g-2015.svg" width={20} height={20}/>
                        <span>Googleで続ける</span>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
