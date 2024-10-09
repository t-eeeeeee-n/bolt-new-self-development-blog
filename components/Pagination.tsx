import Link from 'next/link';
import { Button } from '@/components/ui/button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Button asChild>
          <Link href={`/?page=${currentPage - 1}`}>前へ</Link>
        </Button>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          asChild
        >
          <Link href={`/?page=${page}`}>{page}</Link>
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button asChild>
          <Link href={`/?page=${currentPage + 1}`}>次へ</Link>
        </Button>
      )}
    </div>
  );
}