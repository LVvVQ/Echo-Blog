import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NoutFound() {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px]">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        This post cound not be found. Please try again.
      </EmptyPlaceholder.Description>
      <Link to="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        Go to Dashboard
      </Link>
    </EmptyPlaceholder>
  );
}
