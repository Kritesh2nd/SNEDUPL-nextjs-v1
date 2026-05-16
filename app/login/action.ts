import { getBaseUrl } from "@/lib/utils";
import { LoginResponseDto } from "@/types";

export async function loginUser(data: LoginResponseDto) {
  const res = await fetch(getBaseUrl() + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}
