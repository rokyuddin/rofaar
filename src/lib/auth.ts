import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { apiClient } from "./api-client";
import { ApiResponse, AuthResponse } from "@/types/api";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await apiClient.post<ApiResponse<AuthResponse>>(
            "/auth/login",
            {
              phone: credentials?.phone,
              password: credentials?.password,
            },
          );

          if (response.data.success && response.data.data) {
            const { user, token } = response.data.data;
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              token: token,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
