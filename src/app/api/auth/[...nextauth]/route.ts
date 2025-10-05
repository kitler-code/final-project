import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode" ;
export const NextOptions: NextAuthOptions = {
  pages: { 
    signIn: "/login",
   },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(Credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
            {
              method: "post",
              body: JSON.stringify({
                email: Credentials?.email,
                password: Credentials?.password,
              }),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          const data = await res.json();
          console.log("data", data);

          if (data.message == "success") {
            const decodeToken: { id: string } = jwtDecode(data.token);
            console.log(decodeToken);
            return {
              id: "",
              user: data.user,
              token: data.token,
            } 
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(NextOptions);
export { handler as GET, handler as POST };
