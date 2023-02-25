import axios from "axios";

let baseUrl = "http://localhost:3000/api";

if (
  process.env.NEXT_PUBLIC_VERCEL_ENV &&
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
) {
  baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
}

export const api = axios.create({
  baseURL: baseUrl,
});
