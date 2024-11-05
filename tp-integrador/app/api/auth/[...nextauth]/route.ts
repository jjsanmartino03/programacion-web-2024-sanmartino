import NextAuth, {AuthOptions} from "next-auth";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import {CustomSession} from "@/types/common";
import {JWT, JWTEncodeParams} from "next-auth/jwt";
import jwt from 'jsonwebtoken';

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client.db().collection("users");
        console.log(credentials)
        if (!credentials) return null;

        const user = await usersCollection.findOne({email: credentials.email});
        if (user && await compare(credentials.password, user.password)) {
          return {id: user._id.toString(), email: user.email};
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    async encode(params: JWTEncodeParams) {
      return jwt.sign({
          ...params.token,
        },
        params.secret as string, );
    },
    async decode(params) {
      return {
        ...jwt.verify(params.token as string, params.secret as string) as JWT,
        token: params.token
      }
    },


    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  callbacks: {
    async jwt({token, user, session, account}) {
      if (user) {
        token.id = user.id;
      }
      console.log(session, 'session');

      return token;
    },
    session({session, token}): CustomSession {
      console.log(session);
      console.log(token, 'token');
      const customSession: CustomSession = {
        ...session,
        user: {email: session.user?.email,},
        token: token.token as string
      };
      if (token?.id) {
        customSession.user.id = token.id as string;
      }
      return customSession;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};