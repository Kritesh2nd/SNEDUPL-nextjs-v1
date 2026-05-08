import { getBaseUrl, getLocalStorage } from "@/lib/utils";

const token = getLocalStorage("token");
export async function getMe() {
  const res = await fetch(getBaseUrl() + "/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}
