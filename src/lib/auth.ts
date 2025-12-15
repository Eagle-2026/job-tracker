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
  // -------------------------
  // Auth Providers
  // -------------------------
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials (email/password)
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

        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Return safe user object
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  // -------------------------
  // Session configuration
  // -------------------------
  session: { strategy: "jwt" },

  // -------------------------
  // Pages
  // -------------------------
  pages: { signIn: "/login" },

  // -------------------------
  // Secret
  // -------------------------
  secret: process.env.NEXTAUTH_SECRET,

  // -------------------------
  // Callbacks
  // -------------------------
  callbacks: {
    // -------------------------
    // Sign In callback
    // -------------------------
 async signIn({ user }) {
  if (!user.email) return false;

  // Check if user exists
  const dbUser = await prisma.user.findUnique({ where: { email: user.email } });

  if (!dbUser) {
    const newUser = await prisma.user.create({
      data: {
        name: user.name ?? "",
        email: user.email,
        password: "", // OAuth users have no password
        role: "user",
      },
    });
    (user as PrismaUser).id = newUser.id;
    (user as PrismaUser).role = newUser.role;
  } else {
    (user as PrismaUser).id = dbUser.id;
    (user as PrismaUser).role = dbUser.role;
  }

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
