const TOKEN = import.meta.env.VITE_SALLING_GROUP_API_TOKEN as string;

if (!TOKEN) {
  console.error("API token not found");
}

export const API_TOKEN = import.meta.env.VITE_SALLING_GROUP_API_TOKEN;
