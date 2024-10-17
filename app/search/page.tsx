import { getPosts } from '@/lib/api';
import Client from './client';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string, page?: string } }) {
    const initialQuery = searchParams.q || '';
    const initialPage = parseInt(searchParams.page || '1', 10);
    const data = await getPosts(initialPage, initialQuery);

    return (
        <Client initialPosts={data.posts} initialQuery={initialQuery} initialPage={initialPage}
                totalPages={data.totalPages} totalPosts={data.totalPosts} />
    );
}