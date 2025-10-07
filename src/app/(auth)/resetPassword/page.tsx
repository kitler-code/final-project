
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const SchemeResetPassword = z.object({
    email: z.string().email("Email is invalid").nonempty("Email is required"),
    newPassword: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character"
      ),
  });

  const form = useForm<z.infer<typeof SchemeResetPassword>>({
    defaultValues: {
      email:
        typeof window !== "undefined"
          ? localStorage.getItem("resetEmail") || ""
          : "",
      newPassword: "",
    },
    resolver: zodResolver(SchemeResetPassword),
  });

  async function handleResetPassword(
    values: z.infer<typeof SchemeResetPassword>
  ) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successful!");
        localStorage.removeItem("resetEmail");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleResetPassword)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    className={
                      fieldState.error
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>New Password:</FormLabel>
                <FormControl>
                  <Input
                    className={
                      fieldState.error
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    type="password"
                    placeholder="Enter your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner variant="ring" size={20} className="mr-2" />
                Resetting Password...
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
