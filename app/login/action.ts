import { getBaseUrl } from "@/lib/utils";
import { LoginDto } from "../../../../backend/distillery-api/src/auth/dto/login.dto";

export async function loginUser(data: LoginDto) {
  const res = await fetch(getBaseUrl() + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}

// export async function loginUser(data: LoginDto) {}
