import { getBaseUrl } from "@/lib/utils";
import { AdminLogin } from "@/types";

export async function loginUser(data: AdminLogin) {
  const res = await fetch(getBaseUrl() + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}
