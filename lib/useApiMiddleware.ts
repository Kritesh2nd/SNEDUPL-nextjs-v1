// useApiMiddleware.ts
import { useEffect } from "react";
import { useSite } from "@/context/SiteContext";
import { api, isTokenExpired } from "./utils";

export function useApiMiddleware() {
  const { token, setToken } = useSite();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        // If no token → just proceed
        if (!token || token == "") return config;

        // If token expired → logout flow
        if (isTokenExpired(token)) {
          localStorage.removeItem("token");
          setToken("");

          // redirect (Next.js safe fallback)
          window.location.href = "/login";

          return config; // request will likely fail anyway after redirect
        }

        // valid token → attach header
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      },
      (error) => Promise.reject(error),
    );

    // cleanup interceptor on unmount
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [token, setToken]);
}
