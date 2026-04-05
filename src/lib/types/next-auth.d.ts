// /* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "next-auth";

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

// declare module "next-auth" {
//   interface User {
//    id: string;
//     email: string;
//     username: string;
//     name: string;
//     role: "STUDENT" | string;
//     accessToken: string;
//     refreshToken: string;
//     isActive: boolean;
//     githubUrl: string | null;
//     linkedinUrl: string | null;
//     currentSemester: number;
//     departmentId: number;
//     targetTrackId: number;
//     trackId: number;
//     trackName: string;
//     year: number;
//     facultyId: number;
//     universityId: number;
//     profile: {
//       current_semester: number;
//       department_id: number;
//       faculty_id: number;
//       target_track_id: number;
//       university_id: number;
//       year: number;
//     };
//   }

//   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//   interface Session  {
//      user: Omit<User, "accessToken" | "refreshToken">;
//   expires: string;
//   }
// }

// declare module "next-auth/jwt" {
//   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//   interface JWT extends Omit<User, "id"> {
//  userId: string;
//   }
// }


declare module "next-auth" {
  interface User {
    id: string;
    email: string ;
    username: string;
    name: string;
    role: "STUDENT" | string;
    accessToken: string;
    refreshToken: string;
    isActive: boolean;
    githubUrl: string | null;
    linkedinUrl: string | null;
    currentSemester: number;
    departmentId: number;
    targetTrackId: number;
    trackId: number;
    trackName: string;
    year: number;
    facultyId: number;
    universityId: number;
    profile: {
      current_semester: number;
      department_id: number;
      faculty_id: number;
      target_track_id: number;
      university_id: number;
      year: number;
    };
  }

  interface Session {
    user: Omit<User, "accessToken" | "refreshToken">;
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Omit<User, "id"> {
    userId: string;
  }
}