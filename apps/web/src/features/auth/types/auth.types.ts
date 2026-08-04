export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  role: "Admin" | "User";
  username?: string;
};