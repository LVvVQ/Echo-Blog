import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { RefreshTokenResponse, Response } from "@/types";

export const requests = axios.create({
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

const refreshToken = async () => {
  const { accessToken, refreshToken: refreshTokenStr } =
    useAuthStore.getState();
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshTokenStr);
  return await requests.post<any, Response<RefreshTokenResponse>>(
    "/api/auth/refreshtoken",
    {
      accessToken: accessToken,
      refreshToken: refreshTokenStr,
    },
  );
};

requests.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

requests.interceptors.response.use(
  async (response) => {
    const { accessToken, setAccessToken, logout } = useAuthStore.getState();
    switch (response.data.code) {
      case 401:
        const prevRequest = response?.config;
        const res = await refreshToken();
        if (res.code !== 200) {
          console.log("login expired");
          toast({
            title: "Login expired",
            description: "Please login again",
            variant: "destructive",
          });
          logout();
          return response.data;
        }
        setAccessToken(res.data.accessToken);
        prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return requests(prevRequest);
      case 403:
        toast({
          title: "Forbidden",
          description: "Access denied",
          variant: "destructive",
        });
        return response.data;
      case 500:
        toast({
          title: "Server Busy",
          description: "Please try again later",
          variant: "destructive",
        });
        return response.data;
      default:
        console.log("data", response.data);
        return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);
