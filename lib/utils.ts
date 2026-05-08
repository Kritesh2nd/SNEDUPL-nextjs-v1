import { AdminLogin } from "@/types";
import axios from "axios";

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

export function isTokenExpired(token: string): boolean {
  try {
    if (!token) return true;

    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return true;

    const payloadJson = atob(
      payloadBase64.replace(/-/g, "+").replace(/_/g, "/"),
    );
    const payload = JSON.parse(payloadJson);

    if (!payload?.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    // If token is malformed or decoding fails, treat as expired
    return true;
  }
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) throw new Error("Base Url Not Found");

  return url;
};
