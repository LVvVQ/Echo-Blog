import { reqAddPost, reqDeletePost, reqPostByUid } from "@/api/post";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function usePost() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["posts", "uid", user.id],
    queryFn: () => reqPostByUid(user.id),
  });

  const addMutation = useMutation({
    mutationFn: reqAddPost,
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "uid", user.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: reqDeletePost,
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "Your post was not deleted. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "uid", user.id] });
    },
  });

  return {
    data,
    isPending,
    isError,
    addMutation,
    deleteMutation,
  };
}
