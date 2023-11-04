import DashboardHeader from "@/components/DashboardHeader";
import DashboardShell from "@/components/DashboardShell";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import PostCreateButton from "@/components/PostCreateButton";
import PostItem from "@/components/PostItem";
import usePost from "@/hooks/usePost";

export default function Dashboard() {
  const { data: posts, isPending } = usePost();

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      {isPending ? (
        <div className="divide-border-200 divide-y rounded-md border">
          <PostItem.Skeleton />
          <PostItem.Skeleton />
          <PostItem.Skeleton />
          <PostItem.Skeleton />
          <PostItem.Skeleton />
        </div>
      ) : (
        <div>
          {posts?.length ? (
            <div className="divide-y divide-border rounded-md border">
              {posts.sort((a,b)=>(new Date(b.updatedAt as string).getTime() - new Date(a.updatedAt as string).getTime())).map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any posts yet. Start creating content.
              </EmptyPlaceholder.Description>
              <PostCreateButton variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
