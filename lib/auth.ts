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
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      session.user.tenantId = dbUser.tenantId ?? null;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        token.id = user.id;
        token.tenantId = dbUser.tenantId ?? null;
      }
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

export const getUserTenant = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;

  const tenant = await prisma.tenant.findUnique({
    where: { id: user.tenantId },
  });

  return tenant;
};
