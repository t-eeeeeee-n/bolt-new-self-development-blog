import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function About() {
    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-4">
            {/* Left Advertisement (visible on large screens) */}
            <div className="col-span-3 hidden lg:flex items-center justify-center">
                {/* Advertisement Space */}
            </div>

            {/* Main Content */}
            <div className="col-span-12 lg:col-span-6">
                <h1 className="text-3xl font-bold mb-6">私たちについて</h1>
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <p>
                            こんにちは、そしてようこそ私たちの自己啓発ブログへ。
                        </p>
                        <p>
                            私たちは、「一歩を踏み出す勇気が、人生を変える原動力になる」という信念のもと、このブログを運営しています。この場所は、皆さんが自己成長の旅を歩んでいく中で、小さなヒントや大きなインスピレーションを得るための場所です。私たちのブログでは、様々な側面から成長について考え、多くの人にとって大切な気づきを得られるよう努めています。この場があなたの心の支えとなり、前進するための力になることを目指しています。
                        </p>
                        <p>
                            私たち自身も、迷いや悩みを抱えながら成長を続けている人間です。だからこそ、皆さんと同じように、もっと良い自分になりたい、もっと意味のある人生を送りたいと願う気持ちに共感できます。このブログを通じて、私たちが見つけたアイデアや経験、気づきをシェアし、一緒に成長していければと思っています。私たちの経験は決して特別なものではありませんが、それでも多くの方にとって役に立つ何かがあると信じています。共に歩むことで、より深い理解と自己成長が可能になると考えています。
                        </p>
                        <p>
                            私たちの記事には、日々の習慣を変えるための実践的なアドバイスや、自分の心を見つめ直すための問い、そして人生の目的を見つけるためのヒントが詰まっています。これらの記事は、現実の課題に対処するためのサポートとなり、読者の皆さんが一歩一歩成長していくことを手助けする内容を目指しています。また、困難な状況に直面した際にどのように乗り越えるか、そのヒントとなるような記事も提供しています。皆さんにとってこのブログが、心に火を灯し、新たな一歩を踏み出すきっかけになることを願っています。
                        </p>
                        <p>
                            私たちのブログを通じて、あなたが少しでも「昨日の自分より今日の自分が好きになれる」そんな瞬間を増やしていけたら、これ以上の喜びはありません。一緒に成長し、変化し、人生を彩る冒険に出かけましょう。このブログは単なる情報の発信だけでなく、読者の皆さんとともに作り上げていくコミュニティでもあります。私たちが共有する思いや経験が、あなたの成長の一助となり、そしてあなたの声がまた他の誰かの成長の支えになることを願っています。
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Right Advertisement (visible on large screens) */}
            <div className="col-span-3 hidden lg:flex items-center justify-center">
                {/* Advertisement Space */}
            </div>
        </div>
    );
}
