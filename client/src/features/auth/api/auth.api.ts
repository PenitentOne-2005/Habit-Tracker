import { api, ApiRoutes } from "@/shared/api";
import type { AuthPayload, AuthResponse } from "./interface";

export const register = (data: AuthPayload) =>
  api.post<AuthResponse>(ApiRoutes.auth.register, data);

export const login = (data: AuthPayload) =>
  api.post(ApiRoutes.auth.login, data);
