import NotFound from "@/pages/NotFound";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
  allowedRoles: string[];
}

export default function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { accessToken } = useAuthStore();
  const { user, getUserInfo } = useUserStore();

  useEffect(() => {
    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to={`/login?from=${location.pathname}`} replace />;
  }

  return user?.roles?.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <NotFound />
  );
}
