import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import MainNav from "@/components/MainNav";
import SiteFooter from "@/components/SiteFooter";

export default function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              to="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "px-4",
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
