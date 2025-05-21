import type { LoginResponse } from "~/types/LoginResponse";

export const useLogin = () => {
  const login = async (password: string) => {
    return await $fetch<LoginResponse>("/api/login", {
      method: "POST",
      body: { password },
    });
  };

  return { login };
};
