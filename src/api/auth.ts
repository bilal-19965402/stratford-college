import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginRequest {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginRequest) => {
  const response = await API.post("/auth/login", data);

  return response.data;
};