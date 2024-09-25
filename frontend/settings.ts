const TOKEN = import.meta.env.VITE_SALLING_GROUP_API_TOKEN as string;
const URL = import.meta.env.VITE_SALLING_GROUP_API_URL as string;
if (!TOKEN) {
  console.error("API token not found");
}

if (!URL) {
  console.error("API URL not found");
}

export const API_TOKEN = TOKEN;
export const API_URL = URL;
