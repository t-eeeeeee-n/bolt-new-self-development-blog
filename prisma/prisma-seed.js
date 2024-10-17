const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // ユーザーを作成
    const user = await prisma.user.create({
        data: {
            email: "test@test.com",
            name: "testUser",
            password: "password123", // 実際のアプリではハッシュ化されたパスワードを使用
        },
    });

    // 複数のポストを作成
    await prisma.post.createMany({
        data: [
            {
                title: "習慣の力で成功を引き寄せる方法",
                content: "成功は一朝一夕で手に入るものではありません。習慣を変えることで人生が大きく変わります。成功に必要な小さな習慣を見直してみましょう。",
                excerpt: "成功は習慣から始まる...",
                category: "自己啓発",
                tags: "習慣, 成功, 自己改善",
                authorId: user.id,
                createdAt: new Date('2024-03-01'),
            },
            {
                title: "目標設定の重要性と達成するためのステップ",
                content: "目標を持つことで、人生に明確な方向性を持たせることができます。達成可能な目標を設定し、それに向かうステップを具体的に解説します。",
                excerpt: "目標を設定し、成功を手に入れるためのステップ...",
                category: "自己啓発",
                tags: "目標設定, 自己啓発, 人生設計",
                authorId: user.id,
                createdAt: new Date('2024-05-01'),
            },
            {
                title: "時間管理のコツと生産性向上の秘訣",
                content: "限られた時間を有効に使うための時間管理術を紹介します。生産性を最大限に引き出すためのヒントを学びましょう。",
                excerpt: "時間を効率的に使い、生産性を高める...",
                category: "自己啓発",
                tags: "時間管理, 生産性, 効率化",
                authorId: user.id,
                createdAt: new Date('2024-06-01'),
            },
            {
                title: "失敗を成功に変えるマインドセット",
                content: "失敗は成功の母とも言われますが、失敗をどう捉えるかが重要です。前向きなマインドセットで、失敗を成長のチャンスに変えましょう。",
                excerpt: "失敗を恐れず、学びに変える方法...",
                category: "自己啓発",
                tags: "失敗, マインドセット, 成長",
                authorId: user.id,
                createdAt: new Date('2024-07-01'),
            },
            {
                title: "自信を持つためのステップ",
                content: "自信は成功の鍵です。自信を持つためには、自分自身をよく理解し、内なる強さを見つける必要があります。自信を育むためのステップを紹介します。",
                excerpt: "自信を持つための具体的な方法...",
                category: "自己啓発",
                tags: "自信, メンタル, 自己成長",
                authorId: user.id,
                createdAt: new Date('2024-08-01'),
            },
            {
                title: "ストレス管理と心の健康を保つ方法",
                content: "現代社会では、ストレスは避けられないものです。しかし、ストレスを正しく管理することで、心の健康を保つことができます。ストレスを減らす方法を学びましょう。",
                excerpt: "心の健康を保つためのストレス管理術...",
                category: "自己啓発",
                tags: "ストレス, メンタルヘルス, 健康",
                authorId: user.id,
                createdAt: new Date('2024-09-01'),
            },
            {
                title: "ポジティブ思考で人生を変える",
                content: "ポジティブ思考は、人生を大きく変える力があります。ネガティブな状況でも、前向きな視点を持ち続ける方法について解説します。",
                excerpt: "ポジティブな思考で人生をより良く...",
                category: "自己啓発",
                tags: "ポジティブ思考, 幸福, 自己成長",
                authorId: user.id,
                createdAt: new Date('2024-10-01'),
            },
            {
                title: "人間関係を良好に保つためのコミュニケーション術",
                content: "人間関係は人生において重要な要素です。良好な関係を築くためには、コミュニケーションが鍵となります。効果的なコミュニケーション術を学びましょう。",
                excerpt: "人間関係を向上させるコミュニケーションのコツ...",
                category: "自己啓発",
                tags: "コミュニケーション, 人間関係, 自己改善",
                authorId: user.id,
                createdAt: new Date('2024-11-01'),
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
