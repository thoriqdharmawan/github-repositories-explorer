import type { AxiosInstance } from "axios";
import axios from "axios";

export const apiApp: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URI || "https://api.github.com",
});
