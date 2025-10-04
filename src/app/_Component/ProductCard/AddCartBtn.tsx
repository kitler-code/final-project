"use client";
import { AddProductToCart } from "@/CartAction/CartAction";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AddCartBtn({ id }: { id: string }) {
  async function addProduct(id: string) {
    const data = await AddProductToCart(id);
    if (data.status == "success") {
      toast.success(data.message, { position: "top-center" });
    } else {
      toast.error("incorrect Id", { position: "top-center" });
    }
  }
  return (
    <Button
      onClick={() => addProduct(id)}
      className="bg-main w-full rounded-3xl"
    >
      Add To Cart
    </Button>
  );
}
