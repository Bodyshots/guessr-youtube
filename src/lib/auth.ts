import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: 'https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login',
      })
    ],
  };