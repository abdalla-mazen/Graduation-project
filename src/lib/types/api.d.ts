// declare type DatabaseProperties = {
//   _id: string;
//   createdAt: string;
//   updatedAt?: string;
//   passwordChangedAt?: string;
// };

// declare type ErrorResponse = {
//   error: string;
// };

// declare type SuccessResponse<T> = {

//   ok: boolean;
// } & T;

// declare type PaginatedResponse<T> = {
//   metadata: {
//     currentPage: number;
//     totalPages: number;
//     limit: number;
//     totalItems: number;
//   };
// } & T;

// declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;


// types/api.d.ts (إذا لم يكن موجود)
interface ApiResponse<T> {
  error?: string;
  user: UserData;
  access_token: string;
}

interface LoginResponse {
  user: UserData;
  access_token: string;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  name?: string;
  // أضف باقي الحقول إذا لزم الأمر
}