import { ApiRoutes, api } from "../index";
import type { AuthResponse, AuthPayload } from "./interface";

export const register = (data: AuthPayload) =>
  api.post<AuthResponse>(ApiRoutes.authRegister, data);

export const login = (data: AuthPayload) => api.post(ApiRoutes.authLogin, data);
