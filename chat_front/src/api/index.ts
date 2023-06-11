import axios from "axios";

// export const baseURL = "http://localhost:8000";
export const baseURL = "https://rust-chatapp-production.up.railway.app";

export const api = axios.create({
  baseURL,
});
