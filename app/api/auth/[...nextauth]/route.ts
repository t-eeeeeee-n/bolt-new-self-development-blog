import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

// handlerをGETとPOSTのエクスポートとして設定
export { handler as GET, handler as POST };