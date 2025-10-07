"use server";

import { getUserToken } from "@/getUserToken";

export async function checkoutPayment(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_REDIRECT_URL}`,
      {
        method: "post",
        body: JSON.stringify({
          shippingAddress: shippingData,
        }),
        headers: {
          "Content-Type": "application/json",
          token: String(token),
        },
      }
    );
    const data = await res.json();
    return data;
  }
}
