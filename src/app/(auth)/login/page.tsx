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
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const SchemeLogin = z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character"
      ),
  });

  const LoginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SchemeLogin),
  });

  async function handleLogin(values: z.infer<typeof SchemeLogin>) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        toast.success("Login successful!", { position: "top-center" });
        router.push("/");
      } else {
        toast.error(data.message || "Login failed", { position: "top-center" });
      }
    } catch (error) {
      toast.error("An error occurred during login", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <Form {...LoginForm}>
        <form
          className="space-y-4"
          onSubmit={LoginForm.handleSubmit(handleLogin)}
        >
          <FormField
            control={LoginForm.control}
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
            control={LoginForm.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    className={
                      fieldState.error
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Link
              href="/forgetPassword"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner variant="ring" size={20} className="mr-2" />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Spinner } from "@/components/ui/spinner";
// import { signIn } from "next-auth/react";

// export default function Login() {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const SchemeLogin = z.object({
//     email: z.email("Invalid email").nonempty("Email is required"),
//     password: z.string().nonempty("Password is required"),
//   });

//   const LoginForm = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     resolver: zodResolver(SchemeLogin),
//   });

//   async function handleLogin(values: z.infer<typeof SchemeLogin>) {
//     const data = await signIn("credentials", {
//       email: values.email,
//       password: values.password,
//       redirect: false,
//       // callbackUrl: "/",
//     });
//     if (data?.ok) {
//       toast.success("Login successful!", { position: "top-center" });
//       router.push("/");
//     } else {
//       toast.error(data?.error, { position: "top-center" });
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
//       <Form {...LoginForm}>
//         <form
//           className="space-y-4"
//           onSubmit={LoginForm.handleSubmit(handleLogin)}
//         >
//           <FormField
//             control={LoginForm.control}
//             name="email"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel>Email:</FormLabel>
//                 <FormControl>
//                   <Input
//                     className={
//                       fieldState.error
//                         ? "border-red-500 focus-visible:ring-red-500"
//                         : ""
//                     }
//                     type="email"
//                     placeholder="Enter your email"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={LoginForm.control}
//             name="password"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel>Password:</FormLabel>
//                 <FormControl>
//                   <Input
//                     className={
//                       fieldState.error
//                         ? "border-red-500 focus-visible:ring-red-500"
//                         : ""
//                     }
//                     type="password"
//                     placeholder="Enter your password"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           <div className="text-right">
//             <Link
//               href="/forgetPassword"
//               className="text-sm text-blue-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//           <Button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center">
//                 <Spinner variant="ring" size={20} className="mr-2" />
//                 Logging in...
//               </div>
//             ) : (
//               "Login"
//             )}
//           </Button>
//         </form>
//       </Form>
//       <div className="mt-4 text-center">
//         <p className="text-sm text-gray-600">
//           Dont have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:underline">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
