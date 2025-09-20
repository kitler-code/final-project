// "use client";
// import React from "react";
// import {
//   ControllerFieldState,
//   ControllerRenderProps,
//   FieldValues,
//   useForm,
//   UseFormStateReturn,
// } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/comvponents/ui/button";
// import { Input } from "@/components/ui/input";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// export default function ForgetPassword() {
//   const Route = useRouter();
//   const SchemeForgetPassword = z.object({
//     email: z.email("Email invalid").nonempty("Email Required"),
//   });

//   const forgetForm = useForm({
//     defaultValues: {
//       email: "",
//     },
//     resolver: zodResolver(SchemeForgetPassword),
//   });
//   async function handleForgetPassword(
//     values: z.infer<typeof SchemeForgetPassword>
//   ) {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords`,
//       {
//         method: "post",
//         body: JSON.stringify(values),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await res.json();
//     if (data.statusMsg == "success") {
//       Route.push("/resetCode");
//     } else {
//       toast.error(data.message, { position: "top-center" });
//     }
//   }
//   return (
//     <>
//       <div className="w-3/4 mx-auto my-5">
//         <h1 className="text-3x my-5 ">Login</h1>
//         <Form {...forgetForm}>
//           <form
//             className="space-y-3"
//             onSubmit={forgetForm.handleSubmit(handleForgetPassword)}
//           >
//             <FormField
//               control={forgetForm.control}
//               name="email"
//               render={({ field, fieldState }) => (
//                 <FormItem>
//                   <FormLabel>Enter Your email:</FormLabel>
//                   <FormControl>
//                     <Input
//                       className={
//                         fieldState.error
//                           ? "border-red-500 focus-visible:ring-red-500"
//                           : ""
//                       }
//                       type="email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />
//             <Button className="w-full bg-main">Send Email</Button>
//           </form>
//         </Form>
//       </div>
//     </>
//   );
// }
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
import { Button } from "@/components/ui/button"; // Fixed typo
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const SchemeForgetPassword = z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
  });

  const forgetForm = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(SchemeForgetPassword),
  });

  async function handleForgetPassword(
    values: z.infer<typeof SchemeForgetPassword>
  ) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Reset code sent to your email", {
          position: "top-center",
        });
        router.push("/resetCode");
      } else {
        toast.error(data.message || "Failed to send reset code", {
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
      <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>
      <Form {...forgetForm}>
        <form
          className="space-y-4"
          onSubmit={forgetForm.handleSubmit(handleForgetPassword)}
        >
          <FormField
            control={forgetForm.control}
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
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner variant="ring" size={20} className="mr-2" />
                Sending...
              </div>
            ) : (
              "Send Reset Code"
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
