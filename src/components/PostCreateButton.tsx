import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import usePost from "@/hooks/usePost";
import { useNavigate } from "react-router-dom";

interface PostCreateButtonProps extends ButtonProps { }

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { addMutation } = usePost();
  const navigate = useNavigate();

  async function onClick() {
    const post = await addMutation.mutateAsync({ title: "Untitled Post" });

    if (addMutation.isError) {
      return;
    }

    navigate(`/editor/${post.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        { "cursor-not-allowed opacity-60": addMutation.isPending },
        className,
      )}
      disabled={addMutation.isPending}
      {...props}
    >
      {addMutation.isPending ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New <span className="hidden md:inline-block">&ensp;post</span>
    </button>
  );
}
