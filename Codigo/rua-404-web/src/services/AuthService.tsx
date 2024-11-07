import axios from "axios";
import { handleError } from "../utils/handlers/ErrorHandler";
import { User } from "../models/User";

const api = "http://localhost:8080/";

export const registerApi = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const data = await axios.post<User>(api + "auth/register", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginApi = async (email: string, password: string) => {
  try {
    const data = await axios.post<User>(api + "auth/login", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
