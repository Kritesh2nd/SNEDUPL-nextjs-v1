"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

import { isTokenExpired } from "@/lib/utils";
import { useSite } from "../../context/SiteContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/sections/Loading";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();

  const { token, hydration } = useSite();

  if (!hydration) return <Loading />;

  if (token == "" || isTokenExpired(token)) {
    route.push("/login");
  } else {
    return <AdminLayout>{children}</AdminLayout>;
  }
}
