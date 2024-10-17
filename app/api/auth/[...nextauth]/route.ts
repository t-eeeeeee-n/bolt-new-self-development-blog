import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// NextAuthの設定オブジェクトを定義
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("認証情報が提供されていません");
                }

                // メールアドレスでユーザーを検索
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    console.error("ユーザーが見つかりません");
                    return null;
                }

                // パスワードの検証
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    console.error("パスワードが間違っています");
                    return null;
                }

                // ユーザーオブジェクトを返す
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                };
            }
        }),
    ],
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as string,
            };
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// NextAuthハンドラーを設定オブジェクトとともに使用
const handler = NextAuth(authOptions);

// GETとPOSTの両方をエクスポートしてエンドポイントが正しく動作するようにする
export { handler as GET, handler as POST };
