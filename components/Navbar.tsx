"use client"; // クライアントコンポーネント宣言

import Link from 'next/link';
import { useState } from 'react'; // メニューの開閉にuseStateを利用
import { usePathname } from 'next/navigation';
import { ModeToggle } from './mode-toggle';
import { Input } from "@/components/ui/input";
import { Search, Menu } from 'lucide-react'; // ハンバーガーメニューアイコンのimport
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Popoverを使用

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // モバイル用メニューの開閉状態

  // ナビゲーションリンクのスタイルを動的に変更
  const linkClassName = (path: string) =>
      `hover:bg-gray-200 px-4 py-3 transition relative ${
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
            <div className="hidden md:flex items-center space-x-4"> {/* デスクトップ表示時 */}
              <form action="/search" method="get" className="hidden md:flex">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input type="search" name="q" placeholder="記事を検索..." className="pl-8 w-64" />
                </div>
              </form>
              <Button className={"bg-black "}>ログイン</Button>
              {/* テーマトグル */}
              <ModeToggle />
            </div>

            {/* モバイル用ハンバーガーメニュー */}
            <div className="md:hidden flex items-center">
              <Button className={"bg-black"}>ログイン</Button>
              <ModeToggle />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
                    {/* 三本線のハンバーガーメニューアイコン */}
                    <Menu className="w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Link href="/" className={linkClassName('/')}>
                      ホーム
                    </Link>
                    <Link href="/about" className={linkClassName('/timeline')}>
                      About
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* デスクトップ用ナビゲーションリンク */}
          <div className="hidden md:flex pt-2 overflow-x-auto">
            <Link href="/" className={linkClassName('/')}>
              ホーム
            </Link>
            <Link href="/about" className={linkClassName('/timeline')}>
              About
            </Link>
          </div>
        </div>
      </nav>
  );
}
