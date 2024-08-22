import axios from "axios";

const API_URL = "http://localhost:5005/api/auth";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<{ user: any; token: string }>(
      `${API_URL}/login`,
      { email, password }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error logging in: ${error.message}`);
    } else {
      throw new Error("Unexpected error");
    }
  }
};
export const registerUser = async (email: string, password: string) => {
  try {
    await axios.post(`${API_URL}/register`, { email, password });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
