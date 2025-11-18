import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/shared.constant";

// AuthOptions
export const authOptions: NextAuthOptions = {
  // Pages
  pages: {
    signIn: "/login",
  },

  // Providers
  providers: [
    // Credentials
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      // Authorize
      authorize: async (credentials) => {
        // Response
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        // Payload
        const payload: ApiResponse<LoginResponse> = await response.json();

        // Error handling
        if ("error" in payload) {
          throw new Error(payload.error);
        }

        return {
          id: payload.user._id,
          user: payload.user,
          accessToken: payload.token,
        };
      },
    }),
  ],

  // Callbacks
  callbacks: {
    // JWT
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }

      return token;
    },

    // Session
    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};
