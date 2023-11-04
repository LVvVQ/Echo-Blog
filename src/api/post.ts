import { requests } from "@/lib/requests";
import { Post, Response } from "@/types";

function throwError(res: Response<any>) {
  if (res?.code !== 200) {
    throw new Error(res.message);
  }
}

export async function reqPostByUid(uid: number) {
  const res = await requests.get<any, Response<Post[]>>(
    `/api/posts?uid=${uid}`,
  );
  throwError(res);
  return res.data;
}

export async function reqAddPost(post: Post) {
  const res = await requests.post<any, Response<Post>>("/api/posts", post);
  throwError(res);
  return res.data;
}

export async function reqDeletePost(uid: number) {
  const res = await requests.delete<any, Response<null>>(`/api/posts/${uid}`);
  throwError(res);
}

export async function reqGetPostByid(id: number) {
  const res = await requests.get<any, Response<Post>>(`/api/posts/${id}`);
  throwError(res);
  return res.data;
}

export async function reqUpdatePost(post: Post) {
  const res = await requests.patch<any, Response<Post>>(
    `/api/posts/${post.id}`,
    post,
  );
  throwError(res);
  return res.data;
}
