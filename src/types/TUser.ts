export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  role?: "admin" | "user";
  address: string;
  image: string;
}
