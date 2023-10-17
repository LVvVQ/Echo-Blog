import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <Outlet />
    </div>
  );
}
