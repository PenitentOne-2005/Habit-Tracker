export const ApiRoutes = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
  },
  habits: {
    list: "/habits",
    completions: "/habits/completions",
    complete: (id: number) => `/habits/${id}/complete`,
    delete: (id: number) => `/habits/${id}`,
    update: (id: number) => `/habits/${id}`,
  },
} as const;
