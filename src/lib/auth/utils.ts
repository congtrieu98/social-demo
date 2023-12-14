import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs"
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt, { compare } from 'bcrypt';



declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};


type UserCreateInput = {
  email: string;
  hashedPassword: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user, token }) => {
      if (user) {
        session.user.id = user.id
      }
      if (token) {
        session.user.id = token.id as string
      }
      return session;
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (user) {
        return true;
      }
      return false;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // FacebookProvider({
    //   clientId: '1130353061279899',
    //   clientSecret: 'd3c37f6bcc95978a5a63b3d8ea538514',
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@example.com" },
        password: { label: "Password", type: "password", placeholder: "••••••••" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const existingUser = await db.user.findUnique({ where: { email: credentials?.email } });

        if (!existingUser) {
          return null
        }

        // const passwordMatch = await compare(credentials.password, existingUser.password)
        // if (!passwordMatch) {
        //   return null
        // }

        // const createUser = await db.user.create({
        //   data: {
        //     email: credentials?.email,
        //     password: await bcrypt.hash(credentials?.password, 10)
        //   },
        // });

        // await db.account.create({
        //   data: {
        //     provider: "credentials",
        //     type: "credentials",
        //     userId: createUser.id,
        //     providerAccountId: createUser.id,
        //   }
        // });
        return null;
      }
      // else {
      //   if (existingUser.accounts[0].type === "oauth" && !existingUser.accounts[0].password) {
      //     throw new Error('OAuthAccountNotLinkedError');
      //   } else {
      //     const isValidPassword = await bcrypt.compare(credentials?.password, existingUser.accounts[0]?.password);
      //     if (!isValidPassword) {
      //       throw new Error('InvalidPassword');
      //     }
      //     return existingUser;
      //   }
      // }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signIn",
    // signOut: "/auth/signout",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
    error: "/auth/error",
  },
};


export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/api/auth/signin");
};
