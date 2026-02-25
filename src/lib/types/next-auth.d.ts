// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { User } from "next-auth";

// declare module "next-auth" {
//   /**
//    * The shape of the user object returned in the OAuth providers' `profile` callback,
//    * or the second parameter of the `session` callback, when using a database.
//    */
//   interface User {
//     accessToken: string;
//     user: {
//      id: number;
//   username: string;
//   email: string;
//   full_name: string | null;
//   role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
//   is_active: boolean;
//   profile: string | null;
//   github_url: string | null;
//   linkedin_url: string | null;
//   created_at: string;
//   last_login: string | null;
//   certificates: any[];
//   course_progress: any[];
//   exams: any[];
//   notifications: any[];
//   skill_gaps: any[];
//   skills: any[];
//     };
//   }
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: UserData;
//   }
// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//   interface JWT extends User {}
// }




// // // User data من الـ backend
// interface BackendUser {
//   id: number;
//   username: string;
//   email: string;
//   full_name: string | null;
//   role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
//   is_active: boolean;
//   profile: string | null;
//   github_url: string | null;
//   linkedin_url: string | null;
//   created_at: string;
//   last_login: string | null;
//   certificates: any[];
//   course_progress: any[];
//   exams: any[];
//   notifications: any[];
//   skill_gaps: any[];
//   skills: any[];
// }

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: BackendUser;
//     accessToken: string;
//   }

//   /**
//    * The shape of the user object returned in the OAuth providers' `profile` callback,
//    * or the second parameter of the `session` callback, when using a database.
//    */
//   interface User {
//     id: string;
//     accessToken: string;
//     refreshToken: string;
//     user: BackendUser;
//   }
// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     accessToken: string;
//     refreshToken: string;
//     user: BackendUser;
//   }
// }


// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    userId: number;
    username: string;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
      name: string;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userId: number;
    username: string;
    email: string;
    role: string;
  }
}