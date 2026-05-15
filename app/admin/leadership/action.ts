import { getBaseUrl, getLocalStorage } from "@/lib/utils";
import { LeadershipProfile } from "@/types";

const token = getLocalStorage("token");
const CURRENT_URL = "/leadership";

// LEADERSHIP - create
export async function postLeader(data: LeadershipProfile, image: File | null) {
  const { image: img, ...processdData } = data;
  const formData = new FormData();
  formData.append("data", JSON.stringify(processdData));
  if (image) formData.append("image", image);

  const res = await fetch(getBaseUrl() + CURRENT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res;
}

// PRODUCT - get
export async function getLeader() {
  const res = await fetch(getBaseUrl() + CURRENT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

// LEADERSHIP - update
export async function patchLeader(
  data: LeadershipProfile,
  image: File | null,
  id: string,
) {
  const { image: img, ...processdData } = data;
  const formData = new FormData();
  formData.append("data", JSON.stringify(processdData));
  if (image) formData.append("image", image);

  const res = await fetch(getBaseUrl() + CURRENT_URL + "/" + id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res;
}

// LEADERSHIP - delete
export async function deleteLeader(id: string) {
  console.log("delete rey leaders, ", id);
  const res = await fetch(getBaseUrl() + CURRENT_URL + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}
