import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="absolute left-4 top-4 md:left-8 md:top-8"
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Button>
      <div className="font-heading text-7xl font-bold">404</div>
      <div className="mt-4 font-sans text-lg">Page not found</div>
    </div>
  );
}
