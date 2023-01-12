import NextAuth, { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { env } from '../../../env/server.mjs';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientSecret: env.GITHUB_CLIENT_SECRET,
      clientId: env.GITHUB_CLIENT_ID,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
