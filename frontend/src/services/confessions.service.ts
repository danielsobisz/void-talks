import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export const createConfession = async (content: string, token: string) => {
  const response = await apiClient.post(
    ENDPOINTS.CONFESSIONS,
    { content },
    {
      headers: {
        "HCaptcha-Token": token,
      },
    },
  );
  return response.data;
};
