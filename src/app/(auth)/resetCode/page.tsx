"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as z from "zod";

export default function ResetCode() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Validation - 6 digits only
  const resetCodeSchema = z.object({
    resetCode: z
      .string()
      .min(6, "Reset code must be 6 digits")
      .max(6, "Reset code must be 6 digits")
      .regex(/^\d+$/, "Code must contain only digits"),
  });

  const form = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(resetCodeSchema),
  });

  async function handleResetCode(values: z.infer<typeof resetCodeSchema>) {
    setIsLoading(true);

    try {
      // Create headers as in Postman
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "*/*");
      headers.append("Accept-Encoding", "gzip, deflate, br");
      headers.append("Connection", "keep-alive");
      headers.append("User-Agent", "Your-App/1.0.0");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
        {
          method: "POST",
          body: JSON.stringify({ resetCode: values.resetCode }),
          headers: headers,
        }
      );

      // Check HTTP status first
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.status === "Success" || res.status === 200) {
        toast.success("Code verified successfully", { position: "top-center" });
        router.push("/resetPassword");
      } else {
        toast.error(data.message || "Invalid reset code", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error details:", error);
      toast.error("Connection error with server", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Verify Reset Code
      </h1>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(handleResetCode)}
        >
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Enter the 6-digit reset code:
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP
                      {...field}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="gap-2">
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-12 h-12 text-lg border-2 border-gray-300 rounded-md focus:border-blue-500"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-center mt-2" />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
