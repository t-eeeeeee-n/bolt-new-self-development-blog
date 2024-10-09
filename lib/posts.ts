export type Post = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  createdAt: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: '目標設定の重要性',
    content: '明確な目標を立てることが成功への第一歩です。目標を設定することで、私たちは方向性を得て、モチベーションを維持することができます。短期目標と長期目標をバランスよく設定し、定期的に見直すことが重要です。',
    excerpt: '明確な目標を立てることが成功への第一歩です。',
    category: '自己啓発',
    tags: ['目標設定', 'モチベーション'],
    createdAt: '2023-05-01',
  },
  {
    id: 2,
    title: '習慣の力',
    content: '小さな習慣が大きな変化を生み出します。新しい習慣を形成するには約21日かかると言われています。毎日少しずつ継続することで、大きな成果につながります。良い習慣を作ることに焦点を当て、悪い習慣を良い習慣に置き換えていくことが自己啓発の鍵となります。',
    excerpt: '小さな習慣が大きな変化を生み出します。',
    category: '生産性',
    tags: ['習慣形成', '自己改善'],
    createdAt: '2023-05-15',
  },
  {
    id: 3,
    title: 'マインドフルネスの実践',
    content: '現在に集中することで、ストレスを軽減し、生産性を向上させます。マインドフルネスは、今この瞬間に意識を向ける練習です。瞑想や深呼吸などの簡単な実践から始めることができます。日々の生活にマインドフルネスを取り入れることで、より充実した人生を送ることができるでしょう。',
    excerpt: '現在に集中することで、ストレスを軽減し、生産性を向上させます。',
    category: 'メンタルヘルス',
    tags: ['マインドフルネス', 'ストレス管理'],
    createdAt: '2023-06-01',
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostById(id: number): Post | undefined {
  return posts.find(post => post.id === id);
}

export function searchPosts(query: string): Post[] {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.category.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map(post => post.category)));
}

export function getTags(): string[] {
  const allTags = posts.flatMap(post => post.tags);
  return Array.from(new Set(allTags));
}