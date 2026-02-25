// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { JSON_HEADER } from "./lib/constants/shared.constant";

// // AuthOptions
// export const authOptions: NextAuthOptions = {
//   // Pages
//   pages: {
//     signIn: "auth/login",
//   },

//   // Providers
//   providers: [
//     // Credentials
//     Credentials({
//       name: "credentials",
//       credentials: {
//         username: {},
//         password: {},
//       },

//       // Authorize
//       authorize: async (credentials) => {
//         // Response
//         const response = await fetch(`${process.env.API}/auth/login`, {
//           method: "POST",
//           body: JSON.stringify({
//             username: credentials?.username,
//             password: credentials?.password,
//           }),
//           headers: {
//             ...JSON_HEADER,
//           },
//         });

//         // Payload
//         const payload: ApiResponse<LoginResponse> = await response.json();

//         // Error handling
//         if ("error" in payload) {
//           throw new Error(payload.error);
//         }

//         return {
//           id: payload.user.id,
//           user: payload.user,
//           accessToken: payload.access_token,
//         };
//       },
//     }),
//   ],

//   // Callbacks
//   callbacks: {
//     // JWT
//     jwt: ({ token, user }) => {
//       if (user) {
//         token.accessToken = user.accessToken;
//         token.user = user.user;
//       }

//       return token;
//     },

//     // Session
//     session: ({ session, token }) => {
//       session.user = token.user;

//       return session;
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },
// };


// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { JSON_HEADER } from "./lib/constants/shared.constant";

// interface LoginResponse {
//   access_token: string;
//   refresh_token: string;
//   user: {
//     id: number;
//     username: string;
//     email: string;
//     full_name: string | null;
//     role: string;
//     is_active: boolean;
//     profile: string | null;
//     github_url: string | null;
//     linkedin_url: string | null;
//     created_at: string;
//     last_login: string | null;
//     certificates: any[];
//     course_progress: any[];
//     exams: any[];
//     notifications: any[];
//     skill_gaps: any[];
//     skills: any[];
//   };
// }

// interface ApiResponse<T> {
//   error?: string;
//   data?: T;
// }

// // AuthOptions
// export const authOptions: NextAuthOptions = {
//   // Pages
//   pages: {
//     signIn: "/login",
//   },

//   // Providers
//   providers: [
//     // Credentials
//     Credentials({
//       name: "credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       // Authorize
//       authorize: async (credentials) => {
//         try {
//           console.log("🔐 Login attempt for:", credentials?.username);

//           if (!credentials?.username || !credentials?.password) {
//             console.error("❌ Missing credentials");
//             return null;
//           }

//           // Response
//           const response = await fetch(`${process.env.API}/auth/login`, {
//             method: "POST",
//             body: JSON.stringify({
//               username: credentials.username,
//               password: credentials.password,
//             }),
//             headers: {
//               ...JSON_HEADER,
//             },
//           });

//           console.log("📡 Response status:", response.status);

//           // Check if response is OK
//           if (!response.ok) {
//             const errorText = await response.text();
//             console.error("❌ API Error:", errorText);
//             return null;
//           }

//           // Parse response
//           const payload: LoginResponse = await response.json();
//           console.log("✅ Login successful for user:", payload.user.username);

//           // Return user object
//           return {
//             id: String(payload.user.id),
//             accessToken: payload.access_token,
//             refreshToken: payload.refresh_token,
//             user: payload.user,
//           };
//         } catch (error) {
//           console.error("💥 Authorize error:", error);
//           return null;
//         }
//       },
//     }),
//   ],

//   // Callbacks
//   callbacks: {
//     // JWT
//     jwt: async ({ token, user }) => {
//       // أول مرة يسجل دخول
//       if (user) {
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//         token.user = user.user;
//       }

//       return token;
//     },

//     // Session
//     session: async ({ session, token }) => {
//       // حط الـ user data والـ token في الـ session
//       session.user = token.user;
//       session.accessToken = token.accessToken;

//       return session;
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },

//   // Enable debug in development
//   debug: process.env.NODE_ENV === "development",
// };



// authOptions.ts
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/shared.constant";

// AuthOptions
export const authOptions: NextAuthOptions = {
  // Pages
  pages: {
    signIn: "auth/login",
  },

  // Providers
  providers: [
    // Credentials
    Credentials({
      name: "credentials",
      credentials: {
        username: {},
        password: {},
      },

      // Authorize
      authorize: async (credentials) => {
        // Response
        const response = await fetch(`${process.env.API}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
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

        // Return only essential data
        return {
          id: payload.user.id.toString(),
          accessToken: payload.access_token,
          userId: payload.user.id,
          username: payload.user.username,
          email: payload.user.email,
          role: payload.user.role,
          name: payload.user.name || payload.user.username,
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
        token.userId = user.userId;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },

    // Session
    session: ({ session, token }) => {
      session.user = {
        id: token.userId as number,
        username: token.username as string,
        email: token.email as string,
        role: token.role as string,
        name: token.name as string,
      };
      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // JWT settings
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};