import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>About Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            私たちの自己啓発ブログは、個人の成長と発展を支援することを目的としています。
            日々の小さな進歩が、やがて大きな変化をもたらすという信念のもと、
            実践的なアドバイスや洞察を提供しています。
          </p>
          <p className="mt-4">
            このブログを通じて、読者の皆様が自己実現への道を見出し、
            より充実した人生を送るためのヒントを得ていただければ幸いです。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}