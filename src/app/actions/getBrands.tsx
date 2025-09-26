"use server";

import { getUserToken } from "@/getUserToken";

export async function getBrands() {
  const token = await getUserToken();

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }

  return res.json();
}
