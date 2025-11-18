import { User } from "next-auth";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    accessToken: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      gender: string;
      phone: string;
      photo: string;
      role: string;
      // Fix: will get updated later
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      wishlist: any[];
      addresses: Address[];
      createdAt: string;
    };
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserData;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {}
}
