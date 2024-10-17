import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function About() {
    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-4">
            {/* 左側の広告領域（3列に拡張） */}
            <div className="col-span-3 hidden lg:block">
                <div className="h-full w-full flex items-center justify-center">
                    {/*<p>広告スペース</p>*/}
                </div>
            </div>

            {/* メインコンテンツ（6列に縮小） */}
            <div className="col-span-12 lg:col-span-6">
                <h1 className="text-3xl font-bold mb-6">About us</h1>
                <Card>
                    {/*<CardHeader>*/}
                    {/*    <CardTitle>About Us</CardTitle>*/}
                    {/*</CardHeader>*/}
                    <CardContent className={"p-6"}>
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

            {/* 右側の広告領域（3列に拡張） */}
            <div className="col-span-3 hidden lg:block">
                <div className="h-full w-full flex items-center justify-center">
                    {/*<p>広告スペース</p>*/}
                </div>
            </div>
        </div>
    );
}
