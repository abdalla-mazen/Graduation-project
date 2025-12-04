/* eslint-disable @typescript-eslint/no-explicit-any */
declare type Address = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
};

// declare type UserData = {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   gender: string;
//   phone: string;
//   photo: string;
//   role: string;
//   //  Fixx : will get updated later
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   wishlist: any[];
//   addresses: Address[];
//   createdAt: string;
// };

// declare type LoginResponse = {
//   token: string;
//   user: UserData;
// };

declare type UserData = {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  role: string;
  profile: string | null;
  is_active: boolean;
  last_login: string | null;
  certificates: any[]; // ممكن تحدد نوع لو معروف
  course_progress: any[];
  exams: any[];
  notifications: any[];
  skill_gaps: any[];
  skills: any[];
  created_at: string;
};

// Response بعد تسجيل الدخول
declare type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user:UserData ;
};