import { cookies } from "next/headers";
import { decode, getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function getUserToken(request: NextRequest) {
  const cookiesData = await cookies();
  const encryptToken = cookiesData.get("next-auth.session-token")?.value;
  const Usetoken = decode({
    token: encryptToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
}
