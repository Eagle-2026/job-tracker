// src/lib/auth.ts
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { NextAuthOptions } from "next-auth";

// -------------------------
// Types
// -------------------------
export interface PrismaUser {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  password?: string;
}

export interface ExtendedSession extends Session {
  user: Session["user"] & { id: string; role: string };
}

export interface ExtendedJWT extends JWT {
  id: string;
  role: string;
}

// -------------------------
// NextAuth Options
// -------------------------
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // -------------------------
    // Sign In callback
    // -------------------------
    async signIn({ user }) {
      if (!user.email) return false;

      let dbUser: PrismaUser | null = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            name: user.name ?? "",
            email: user.email,
            password: "", // OAuth users have no password
            role: "user",
          },
        });
      }

      // Assign typed id and role to user
      (user as PrismaUser).id = dbUser.id;
      (user as PrismaUser).role = dbUser.role;

      return true;
    },

    // -------------------------
    // JWT callback
    // -------------------------
    async jwt({ token, user }) {
      if (user) {
        const u = user as PrismaUser;
        token.id = u.id;
        token.role = u.role ?? "user";
      }
      return token as ExtendedJWT;
    },

    // -------------------------
    // Session callback
    // -------------------------
    async session({ session, token }) {
      const extendedSession = session as ExtendedSession;
      extendedSession.user.id = token.id;
      extendedSession.user.role = token.role ?? "user";
      return extendedSession;
    },
  },
};
