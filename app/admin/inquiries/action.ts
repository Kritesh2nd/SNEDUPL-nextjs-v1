import { getBaseUrl, getLocalStorage } from "@/lib/utils";
import { Inquiry } from "@/types";

const token = getLocalStorage("token");
const CURRENT_URL = "/inquiries";

// INQUIRIE - create
export async function postInquirie(data: Inquiry) {
  const { id, createdAt, updatedAt, read, ...processed } = data;
  const res = await fetch(getBaseUrl() + CURRENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(processed),
  });

  return res;
}

// INQUIRIE - get
export async function getInquirie(params: string) {
  const res = await fetch(getBaseUrl() + CURRENT_URL + "?" + params, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}

// INQUIRIE - read
export async function readInquirie(id: string) {
  const res = await fetch(getBaseUrl() + CURRENT_URL + "/" + id + "/read", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}

// INQUIRIE - delete
export async function deleteInquirie(id: string) {
  const res = await fetch(getBaseUrl() + CURRENT_URL + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}
