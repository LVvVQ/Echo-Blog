import { Post } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import PostOperations from "@/components/PostOperations"
import { Link } from "react-router-dom"
import { formatDate } from "@/lib/utils"

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">
}

export default function PostItem({post}: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link to={`/editor/${post.id}`} className="font-semibold hover:underline">
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">{formatDate(post?.createdAt as string) }</p>
        </div>
      </div>
      <PostOperations post={{id: post.id, title: post.title}} />
    </div>
  )
}

PostItem.Skeleton = function PostItemSkelton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-5 w-4/5" />
      </div>
    </div>
  )
}
