export interface AuthResponse {
  token: string;
  userId: number;
}

export interface AuthPayload {
  name: string;
  password: string;
}
