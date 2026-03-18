import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const user = await verifyPassword(
          credentials.email as string,
          credentials.password as string,
        );
        return user ?? null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
});

export const verifyPassword = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;
  return user;
};
