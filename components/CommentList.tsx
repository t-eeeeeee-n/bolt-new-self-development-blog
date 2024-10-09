import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        <Card key={comment.id}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {comment.author.name} • {new Date(comment.createdAt).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}