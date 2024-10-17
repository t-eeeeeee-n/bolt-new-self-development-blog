import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

type Comment = {
  id: number;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
};

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
      <div className="space-y-4 mb-8">
        {comments.map((comment) => (
            <Card key={comment.id} className="border border-gray-200 shadow-sm">
              <div className="flex items-start p-4">
                <User className="w-5 h-5 text-blue-500" /> {/* アイコンをやや大きくし、調整 */}
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-semibold">{comment.author.name}</CardTitle>
                    <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                  </div>
                  <CardContent className="mt-2">
                    <p className="text-gray-700">{comment.content}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
        ))}
      </div>
  );
}
