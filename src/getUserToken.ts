"use server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken() {
  const cookieStore = await cookies();
  const encryptToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;
  const data = await decode({
    token: encryptToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return data?.token 
}
