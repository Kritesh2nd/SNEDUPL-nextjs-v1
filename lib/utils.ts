import { AdminLogin } from "@/types";

export const getAdminData = (): AdminLogin => {
  const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "pass";

  const adminData: AdminLogin = {
    username,
    password,
  };

  console.log("admin login", adminData);

  return adminData;
};

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(key);

  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch (err) {
    console.error("Invalid JSON in localStorage:", err);
    return null;
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(key);
}
