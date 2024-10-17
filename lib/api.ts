export async function getPosts(page: number = 1, search: string = '', limit: number = 10) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}&search=${encodeURIComponent(search)}&limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

export async function getRecommendedPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommended-posts`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch recommended posts');
    }
    return res.json();
}