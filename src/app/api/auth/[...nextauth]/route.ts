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
          if (data.message == "success") {
            const decodeToken: { id: string } = jwtDecode(data.token);
            return {
              id: decodeToken.id,
              user: data.user,
              token: data.token,
            } 
          } else {
            throw new Error(data.message);
          }
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}){
       if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token
    },
    async session ({session,user,token}){
      session.user = token.user
      return session
    }
  }
};

const handler = NextAuth(NextOptions);
export { handler as GET, handler as POST };

