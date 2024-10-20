
import NextAuth from "next-auth";
import { verify } from '@node-rs/bcrypt';
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "@/app/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



declare module "next-auth" {
  interface Session {
    accessToken?: string
  } 
}
 
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}