"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './mode-toggle';
import { Input } from "@/components/ui/input";
import { Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClassName = (path: string) =>
      `hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-3 transition relative ${
          pathname === path ? 'text-primary font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-primary' : ''
      }`;

  return (
      <nav className="bg-background border-b sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* ロゴ部分 */}
            <Link href="/" className="text-md md:text-2xl font-bold">
              自己啓発ブログ
            </Link>

            {/* 検索フォーム */}
            <div className="hidden md:flex items-center space-x-4">
              <form action="/search" method="get" className="hidden md:flex">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input type="search" name="q" placeholder="記事を検索..." className="pl-8 w-64" />
                </div>
              </form>

              {status === "loading" ? (
                  <Button className="bg-gray-400 hover:bg-gray-400 cursor-not-allowed">Loading...</Button>
              ) : session ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>{session.user?.name || session.user?.email}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 space-y-2">
                      <Link href="/profile" className="block hover:bg-gray-100 p-2 rounded text-center">
                        プロフィール
                      </Link>
                      <Button onClick={() => signOut()} className="w-full bg-white text-black hover:bg-gray-100 p-2 rounded">
                        ログアウト
                      </Button>
                    </PopoverContent>
                  </Popover>
              ) : (
                  <Button className={"bg-gray-900 transition duration-300 hover:bg-gray-700 dark:bg-white"}>
                    <Link href={"/auth/signin"} className={""}>ログイン</Link>
                  </Button>
              )}

              <ModeToggle />
            </div>

            {/* モバイル用ハンバーガーメニュー */}
            <div className="md:hidden flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Link href="/" className={linkClassName('/')}>
                      ホーム
                    </Link>
                    <Link href="/about" className={linkClassName('/about')}>
                      About
                    </Link>
                    {session ? (
                        <>
                          <Link href="/profile" className="block hover:bg-gray-100 p-2 rounded">
                            プロフィール
                          </Link>
                          <Button onClick={() => signOut()} className="text-left bg-white hover:bg-gray-100 p-2 rounded">
                            ログアウト
                          </Button>
                        </>
                    ) : (
                        <Link href="/auth/signin" className="block hover:bg-gray-100 p-2 rounded">
                          ログイン
                        </Link>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <ModeToggle />
            </div>
          </div>

          {/* デスクトップ用ナビゲーションリンク */}
          <div className="hidden md:flex pt-2 overflow-x-auto">
            <Link href="/" className={linkClassName('/')}>
              ホーム
            </Link>
            <Link href="/about" className={linkClassName('/about')}>
              About us
            </Link>
            <Link href="/search" className={linkClassName('/search')}>
              記事一覧
            </Link>
          </div>
        </div>
      </nav>
  );
}
