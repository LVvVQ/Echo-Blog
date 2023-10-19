import { requests } from "@/lib/requests";
import { Response, User } from "@/types";

export async function reqUserInfo() {
  return await requests.get<any, Response<User>>(
    "/api/user/info",
  );
}
