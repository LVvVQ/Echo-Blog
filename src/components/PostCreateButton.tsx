import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import usePost from "@/hooks/usePost";

interface PostCreateButtonProps extends ButtonProps { }

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { addMutation } = usePost();

  async function onClick() {
    await addMutation.mutateAsync({ title: "Untitled Post" });
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
      New post
    </button>
  );
}
