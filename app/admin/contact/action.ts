import { getBaseUrl, getLocalStorage } from "@/lib/utils";
import { ContactInfo } from "@/types";

const token = getLocalStorage("token");
const CURRENT_URL = "/contact-info";

// CONTACT INFO - upsert
export async function postContactInfo(data: ContactInfo) {
  const { id, mapEmbedUrl, createdAt, updatedAt, ...processedData } = data;
  const res = await fetch(getBaseUrl() + CURRENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(processedData),
  });

  return res;
}

// CONTACT INFO - get
export async function getContactInfo() {
  const res = await fetch(getBaseUrl() + CURRENT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}
