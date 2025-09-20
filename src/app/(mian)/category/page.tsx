import React from "react";
import { getServerSession } from "next-auth";
import { NextOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function page() {
  const x = await getServerSession(NextOptions);
  return <div>page</div>;
}
