// import NextAuth, { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface User {
//     userData: {
//       name: string;
//       email: string;
//       role: string;
//     };
//     tokenData: string;
//   }
//   interface Session {
//     user: User["userData"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     user: User["userData"];
//     idToken?: string;
//   }
// }
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(credentials),
//           }
//         );

//         const data = await res.json();

//         if (res.ok && data.token) {
//           return {
//             userData: data.user,
//             tokenData: data.token,
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user.userData;
//         token.idToken = user.tokenData;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);
