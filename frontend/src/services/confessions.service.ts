import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import { AxiosResponse } from "axios";

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

export const getAllConfessions = async () => {
  const response: AxiosResponse<any, any, {}> = await apiClient.get(
    ENDPOINTS.CONFESSIONS,
  );

  return response.data;
};
