// /* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "next-auth";



declare module "next-auth" {
  // interface User {
  //   id: string;
  //   email: string ;
  //   username: string;
  //   name: string;
  //   role: "STUDENT" | string;
  //   accessToken: string;
  //   refreshToken: string;
  //   isActive: boolean;
  //   githubUrl: string | null;
  //   linkedinUrl: string | null;
  //   currentSemester?: number;
  //   departmentId?: number;
  //   targetTrackId?: number;
  //   trackId: number;
  //   trackName: string;
  //   year: number;
  //   facultyId: number;
  //   universityId: number;
  //   profile: {
  //     current_semester: number;
  //     department_id: number;
  //     faculty_id: number;
  //     target_track_id: number;
  //     university_id: number;
  //     year: number;
  //   };
  // }


    interface User {
    id: string;
    email: string;
    username: string;
    name: string;
    role: "STUDENT" | "TEACHER" | string;
    accessToken: string;
    refreshToken: string;
    isActive: boolean;
    githubUrl: string | null;
    linkedinUrl: string | null;
isFirstTime?: boolean; //

    // ✅ optional — موجودة بس في STUDENT
    currentSemester?: number | null;
    departmentId?: number | null;
    targetTrackId?: number | null;
    trackId?: number | null;
    trackName?: string | null;
    year?: number | null;
    facultyId?: number | null;
    universityId?: number | null;
    profile?: {
      current_semester: number;
      department_id: number;
      faculty_id: number;
      target_track_id: number;
      university_id: number;
      year: number;
    } | null;
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