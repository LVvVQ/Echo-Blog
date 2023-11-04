import { reqGetPostByid } from "@/api/post";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NotFound from "@/pages/Editor/NotFound";
import Loading from "@/pages/Editor/Loading";
import Editor from "@/components/Editor";

export default function EditorPage() {
  const { postId } = useParams();
  const {
    data: post,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => reqGetPostByid(parseInt(postId ?? "")),
    retry: 2,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <Editor
      post={{
        id: post?.id,
        title: post?.title as string,
        content: post?.content,
        published: post?.published,
      }}
    />
  );
}
