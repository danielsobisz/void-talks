import { LoginPayload, RegisterPayload } from "@/types/api/auth.types";
import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

class AuthService {
  async login({ username, password }: LoginPayload) {
    const response = await apiClient.post(ENDPOINTS.LOGIN, {
      username,
      password,
    });

    return response.data;
  }

  async register({ username, password }: RegisterPayload) {
    const response = await apiClient.post(ENDPOINTS.REGISTER, {
      username,
      password,
    });

    return response.data;
  }
}

export const authService = new AuthService();
