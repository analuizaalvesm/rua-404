import axios from "axios";
import { handleError } from "../utils/handlers/ErrorHandler";
import { User } from "../models/User";

const api = "http://localhost:5142/api/";

export const registerApi = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const data = await axios.post<User>(api + "Auth/register", {
      username: username,
      email: email,
      password: password,
      id: 1,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginApi = async (email: string, password: string) => {
  try {
    const data = await axios.post<User>(api + "Auth/login", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
