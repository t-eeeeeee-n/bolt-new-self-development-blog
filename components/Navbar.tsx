import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            自己啓発ブログ
          </Link>
          <div className="flex items-center space-x-4">
            <form action="/search" method="get" className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="search" name="q" placeholder="記事を検索..." className="pl-8 w-64" />
              </div>
            </form>
            <Link href="/" className="hover:text-primary">
              ホーム
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}