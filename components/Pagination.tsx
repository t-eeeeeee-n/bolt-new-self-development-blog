import Link from 'next/link';
import { Button } from '@/components/ui/button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void; // ページ変更時のコールバック
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
      <div className="flex justify-center space-x-2 mt-8">
        {currentPage > 1 && (
            <Button onClick={() => onPageChange(currentPage - 1)}>
              前へ
            </Button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
        ))}
        {currentPage < totalPages && (
            <Button onClick={() => onPageChange(currentPage + 1)}>
              次へ
            </Button>
        )}
      </div>
  );
}
