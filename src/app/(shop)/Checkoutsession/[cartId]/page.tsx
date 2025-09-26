"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/comvponents/ui/form";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/comvponents/ui/input";
import { Button } from "@/comvponents/ui/button";
import { checkoutPayment } from "@/OrderAction/OrderAction";

export default function Checkoutsession() {
  const { cartId }: { cartId: string } = useParams();
  const shippingForm = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });
  async function CheckoutsessionPayment(values: {
    details: string;
    phone: string;
    city: string;
  }) {
    const data = await checkoutPayment(cartId, values);
    console.log("Checkout decoded data:", data);

    if (data?.session?.url) {
      window.location.href = data.session.url;
    } else {
      alert("Payment session not created. Check backend response.");
    }
  }
  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl">Check Out Payment</h1>
      <Form {...shippingForm}>
        <form
          className="space-y-1"
          onSubmit={shippingForm.handleSubmit(CheckoutsessionPayment)}
        >
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel> City </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-main">Payment</Button>
        </form>
      </Form>
    </div>
  );
}
